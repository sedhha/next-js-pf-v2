import { AttributeValue, ClickActionAttributes } from '@/interfaces/fe';
import { sendWSNavigationEvent } from '@/redux/wsUtils';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../tools/store';

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
	identifier1?: string;
	identifier2?: string;
	identifier3?: string;
	identifier4?: string;
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

interface IContactFormTrigger {
	name?: string;
	email?: string;
	subject?: string;
	message?: string;
	shouldSend: boolean;
}

type StaticContent = {
	navigations: INavigations;
	themes: IThemeInteractions;
	sounds: ISoundInteractions;
	clicks: Record<ClickActionAttributes, IClickInteractions>;
	blogs: IBlogViews;
	contacts: IContactFormTrigger;
	viewedBackImage: boolean;
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
		viewedBackImage: false,
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
		},
		contacts: { shouldSend: false }
	}
};

export const onNewSectionView = createAsyncThunk(
	'sendNavigationEvent',
	async (payload: AttributeValue, { getState, dispatch }) => {
		const {
			navigation: { csrfToken, firstPacketSent },
			analytics: {
				wsClient,
				staticContent: {
					navigations: { viewedSections }
				}
			}
		} = getState() as RootState;
		if (csrfToken && wsClient && !viewedSections[payload] && firstPacketSent) {
			sendWSNavigationEvent(wsClient, csrfToken, {
				...viewedSections,
				[payload]: true
			});
		}
		dispatch(setNewSectionView(payload));
	}
);

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
		setNewSectionView: (
			state: AnalyticsState,
			action: PayloadAction<AttributeValue>
		) => {
			const { payload } = action;
			if (
				!state.staticContent.navigations.viewedSections[payload] &&
				state.wsClient
			) {
				state.staticContent.navigations.viewedSections[payload] = true;
			}
			state.staticContent.navigations.latestViewed = payload;
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
				identifier1?: string;
				identifier2?: string;
				identifier3?: string;
				identifier4?: string;
			}>
		) => {
			const {
				description,
				attribute,
				identifier1,
				identifier2,
				identifier3,
				identifier4
			} = action.payload;
			const attributeExists = state.staticContent.clicks[attribute];
			if (attributeExists) {
				state.staticContent.clicks[attribute].clickedTimes =
					(state.staticContent.clicks[attribute].clickedTimes ?? 1) + 1;
			} else
				state.staticContent.clicks[attribute] = {
					clickDescription: description,
					clickedTimes: 1,
					clickIdentifier: attribute,
					clickPerformedAt: new Date().getTime(),
					identifier1,
					identifier2,
					identifier3,
					identifier4
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
		onChangeContactForm: (
			state: AnalyticsState,
			action: PayloadAction<IContactFormTrigger>
		) => {
			state.staticContent.contacts = action.payload;
		},
		onBackImageViewed: (state: AnalyticsState) => {
			state.staticContent.viewedBackImage = true;
		},

		setVisitorID: (state: AnalyticsState, action: PayloadAction<string>) => {
			state.visitorID = action.payload;
		},
		setWSClient: (state: AnalyticsState, action: PayloadAction<WebSocket>) => {
			state.wsClient = action.payload;
		}
	}
});

export const {
	setNewSectionView,
	onDarkModeTrigger,
	onFeaturedBlogView,
	onClickSocialHandle,
	onChangeContactForm,
	onBackImageViewed,
	onLogoHover,
	onClickEvent,
	setVisitorID,
	setWSClient
} = analyticsSlice.actions;
export default analyticsSlice.reducer;
