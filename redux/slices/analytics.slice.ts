import { AttributeValue, ClickActionAttributes } from '@/interfaces/fe';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/*--------------------------- Type Definitions ---------------------- */

interface INavigations {
	shouldSend: boolean;
	latestViewed: AttributeValue;
	viewedSections: Record<AttributeValue, boolean>;
}

interface IThemeInteractions {
	darkModeCount: number;
	darkMode: boolean;
	shouldSend: boolean;
}

interface IClickInteractions {
	clickIdentifier: string;
	clickPerformedAt: number;
	clickedTimes: number;
	clickDescription: string;
}

interface ISoundInteractions {
	playedSound: boolean;
	playedSoundDuration: number;
	shouldSend: boolean;
	playedTimes: number;
}

interface IBlogDetails {
	category: string;
	blogID: string;
	socialHandle: string;
	url: string;
}

interface IBlogView {
	blogID: string;
	category: string;
	timesClicked: number;
	actionType: 'rank-navigate' | 'category-navigate' | 'blog-navigate';
}

interface IExtraDetails {
	userID?: string;
	fingerprint: string;
	clickCount: number;
}

interface IBlogViews {
	ranksViewed: Record<string, IBlogView>;
	socialClicks: Record<string, IBlogDetails & IExtraDetails>;
	shouldSend: boolean;
}

type StaticContent = {
	navigations: INavigations;
	themes: IThemeInteractions;
	sounds: ISoundInteractions;
	clicks: Record<ClickActionAttributes, IClickInteractions>;
	blogs: IBlogViews;
};

type AnalyticsState = {
	wsClient: WebSocket | null;
	restClient: string | null;
	staticContent: StaticContent;
	visitorID: string;
};
/*--------------------------- Type Definitions ---------------------- */

const initialState: AnalyticsState = {
	wsClient: null,
	restClient: null,
	visitorID: 'unknown',
	staticContent: {
		themes: { darkModeCount: 0, darkMode: true, shouldSend: false },
		sounds: {
			playedSound: false,
			shouldSend: false,
			playedSoundDuration: -1,
			playedTimes: 0
		},
		navigations: {
			shouldSend: false,
			viewedSections: {}
		} as INavigations,
		clicks: {},
		blogs: {
			shouldSend: false,
			ranksViewed: {},
			socialClicks: {}
		}
	}
};

export const analyticsSlice = createSlice({
	name: 'AnalyticsSlice',
	initialState,
	reducers: {
		updateLatestViewed: (
			state: AnalyticsState,
			action: PayloadAction<AttributeValue>
		) => {
			const { payload } = action;
			state.staticContent.navigations.latestViewed = payload;
		},
		addViewedSection: (
			state: AnalyticsState,
			action: PayloadAction<AttributeValue>
		) => {
			const { payload } = action;
			state.staticContent.navigations.viewedSections[payload] = true;
		},
		onNewSectionView: (
			state: AnalyticsState,
			action: PayloadAction<AttributeValue>
		) => {
			const { payload } = action;
			state.staticContent.navigations.latestViewed = payload;
			state.staticContent.navigations.viewedSections[payload] = true;
		},
		onDarkModeTrigger: (
			state: AnalyticsState,
			action: PayloadAction<boolean>
		) => {
			const { payload } = action;
			state.staticContent.themes.darkModeCount =
				state.staticContent.themes.darkModeCount + 1;
			state.staticContent.themes.darkMode = payload;
		},
		onLogoHover: (
			state: AnalyticsState,
			action: PayloadAction<{ duration: number; soundPlayed: boolean }>
		) => {
			const {
				payload: { duration, soundPlayed }
			} = action;
			state.staticContent.sounds.playedSound = soundPlayed;
			state.staticContent.sounds.playedSoundDuration = Math.max(
				state.staticContent.sounds.playedSoundDuration,
				duration
			);
			state.staticContent.sounds.playedTimes =
				state.staticContent.sounds.playedTimes + 1;
		},
		onClickEvent: (
			state: AnalyticsState,
			action: PayloadAction<{
				attribute: ClickActionAttributes;
				description: string;
			}>
		) => {
			const { description, attribute } = action.payload;
			const attributeExists = state.staticContent.clicks[attribute];
			if (attributeExists) {
				state.staticContent.clicks[attribute].clickedTimes =
					(state.staticContent.clicks[attribute].clickedTimes ?? 1) + 1;
			} else
				state.staticContent.clicks[attribute] = {
					clickDescription: description,
					clickedTimes: 1,
					clickIdentifier: attribute,
					clickPerformedAt: new Date().getTime()
				};
		},
		onFeaturedBlogView: (
			state: AnalyticsState,
			action: PayloadAction<{ blog: IBlogView; rank: string }>
		) => {
			const { blog, rank } = action.payload;
			if (!state.staticContent.blogs.ranksViewed[rank]) {
				state.staticContent.blogs.ranksViewed[rank] = blog;
			} else
				state.staticContent.blogs.ranksViewed[rank].timesClicked =
					state.staticContent.blogs.ranksViewed[rank].timesClicked + 1;
		},
		onClickSocialHandle: (
			state: AnalyticsState,
			action: PayloadAction<IBlogDetails & IExtraDetails>
		) => {
			const { url } = action.payload;
			state.staticContent.blogs.socialClicks[url] = action.payload;
		},
		setVisitorID: (state: AnalyticsState, action: PayloadAction<string>) => {
			state.visitorID = action.payload;
		}
	}
});

export const {
	onNewSectionView,
	onDarkModeTrigger,
	onFeaturedBlogView,
	onClickSocialHandle,
	onLogoHover,
	setVisitorID,
	onClickEvent
} = analyticsSlice.actions;
export default analyticsSlice.reducer;