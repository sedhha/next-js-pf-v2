import { AttributeValue, ClickActionAttributes } from '@/interfaces/fe';
import allEvents from '@/constants/all-interaction-events.json';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../tools/store';
import { feFetch } from '../../utils/fe/fetch-utils';
import { HELPER_APIS } from '@/utils/fe/apis/public';
import { IClickInteractions } from '@/interfaces/analytics';
import { logEvent } from '@/utils/fe/apis/analytics/logEvent';

/*--------------------------- Type Definitions ---------------------- */

interface INavigations {
	latestViewed: AttributeValue;
	viewedSections: Record<AttributeValue, boolean>;
}

interface IThemeInteractions {
	darkMode: boolean;
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
	clickEvents: Record<string, IClickInteractions>;
};

type AnalyticsState = {
	restClient: string | null;
	staticContent: StaticContent;
	visitorID: string;
};
/*--------------------------- Type Definitions ---------------------- */

const initialState: AnalyticsState = {
	restClient: null,
	visitorID: 'unknown',
	staticContent: {
		clickEvents: {},
		themes: { darkMode: true },
		navigations: {
			viewedSections: {}
		} as INavigations
	}
};

export const onNewSectionView = createAsyncThunk(
	'sendNavigationEvent',
	async (payload: AttributeValue, { getState, dispatch }) => {
		const {
			navigation: { csrfToken, firstPacketSent },
			analytics: {
				staticContent: {
					navigations: { viewedSections }
				}
			}
		} = getState() as RootState;
		if (csrfToken && !viewedSections[payload] && firstPacketSent) {
			feFetch({
				method: 'POST',
				url: HELPER_APIS.CSRF_REST_RECORD_VIEW,
				sendToProxy: true,
				headers: {
					'Content-Type': 'application/json',
					'x-csrf-token': csrfToken
				},
				body: JSON.stringify({
					events: {
						...viewedSections,
						[payload]: true
					}
				})
			});
		}
		dispatch(setNewSectionView(payload));
	}
);

export const onClickEventTrigger = createAsyncThunk(
	'sendClickEvent',
	async (
		payload: {
			attribute: ClickActionAttributes;
			description: string;
			identifier1?: string;
			identifier2?: string;
			identifier3?: string;
			identifier4?: string;
		},
		{ getState, dispatch }
	) => {
		const {
			attribute,
			description,
			identifier1,
			identifier2,
			identifier3,
			identifier4
		} = payload;
		const {
			navigation: { csrfToken },
			analytics: {
				staticContent: { clickEvents }
			}
		} = getState() as RootState;
		if (csrfToken)
			logEvent(csrfToken, attribute, {
				clickDescription: description,
				clickedTimes: (clickEvents[attribute]?.clickedTimes ?? 0) + 1,
				clickIdentifier: attribute,
				clickPerformedAt: new Date().toISOString(),
				identifier1,
				identifier2,
				identifier3,
				identifier4
			});
		dispatch(onClickEvent(payload));
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
			if (!state.staticContent.navigations.viewedSections[payload]) {
				state.staticContent.navigations.viewedSections[payload] = true;
			}
			state.staticContent.navigations.latestViewed = payload;
		},
		onDarkModeTrigger: (
			state: AnalyticsState,
			action: PayloadAction<boolean>
		) => {
			const { payload } = action;
			state.staticContent.themes.darkMode = payload;
		},
		onLogoHover: (
			state: AnalyticsState,
			action: PayloadAction<{ duration: number; soundPlayed: boolean }>
		) => {
			const {
				payload: { duration, soundPlayed }
			} = action;
			const key = (soundPlayed ? allEvents.soundPlayed : allEvents.soundPaused)
				.identifier;
			const description = (
				soundPlayed ? allEvents.soundPlayed : allEvents.soundPaused
			).description;

			state.staticContent.clickEvents[key] = {
				clickIdentifier: key,
				clickPerformedAt: new Date().toISOString(),
				clickedTimes: (state.staticContent.clickEvents[key]?.clickedTimes ?? 0) + 1,
				clickDescription: description,
				identifier1: Math.max(
					+(state.staticContent.clickEvents[key]?.identifier1 ?? 0),
					duration
				).toString()
			};
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
			const attributeExists = state.staticContent.clickEvents[attribute];
			if (attributeExists) {
				state.staticContent.clickEvents[attribute].clickedTimes =
					(state.staticContent.clickEvents[attribute].clickedTimes ?? 1) + 1;
			} else
				state.staticContent.clickEvents[attribute] = {
					clickDescription: description,
					clickedTimes: 1,
					clickIdentifier: attribute,
					clickPerformedAt: new Date().toISOString(),
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
			const key = `featuredBlog-${blog.blogID}-${blog.category}-${rank}`;
			const description = `This event denotes that user has viewed ${blog.blogID} blog with category: ${blog.category}`;
			if (!state.staticContent.clickEvents[key])
				state.staticContent.clickEvents[key] = {
					clickDescription: description,
					clickedTimes: 1,
					clickIdentifier: key,
					clickPerformedAt: new Date().toISOString(),
					identifier1: 'featuredBlogView',
					identifier2: rank.toString(),
					identifier3: blog.blogID,
					identifier4: blog.category
				};
			else state.staticContent.clickEvents[key].clickedTimes += 1;
		},
		onClickSocialHandle: (
			state: AnalyticsState,
			action: PayloadAction<IBlogDetails & IExtraDetails>
		) => {
			const { url } = action.payload;

			const key = `featuredBlogSocialClick-${url}`;
			if (!state.staticContent.clickEvents[key])
				state.staticContent.clickEvents[key] = {
					clickDescription: `This event denotes that user has clicked on social icon url to share the blog - ${url}`,
					clickedTimes: 1,
					clickIdentifier: key,
					clickPerformedAt: new Date().toISOString(),
					identifier1: 'featuredBlogSocialShare',
					identifier2: url
				};
		},
		onChangeContactForm: (
			state: AnalyticsState,
			action: PayloadAction<IContactFormTrigger>
		) => {
			const { payload } = action;
			const key = `contactFormSubmission-${state.visitorID}`;
			state.staticContent.clickEvents[key] = {
				clickIdentifier: key,
				clickDescription:
					'This event denotes that user is trying to add feedback in feedback form.',
				clickedTimes: (state.staticContent.clickEvents[key]?.clickedTimes ?? 0) + 1,
				clickPerformedAt: new Date().toISOString(),
				identifier1: payload.email,
				identifier2: payload.message,
				identifier3: payload.name,
				identifier4: payload.subject
			};
		},
		onBackImageViewed: (state: AnalyticsState) => {
			const key = `viewedBackImage-${state.visitorID}`;
			state.staticContent.clickEvents[key] = {
				clickIdentifier: key,
				clickDescription:
					'This event denotes that user has viewed the back image by hovering over the front image.',
				clickPerformedAt: new Date().toISOString(),
				clickedTimes: 1
			};
		},
		onCommonClickDispatcher: (
			state: AnalyticsState,
			action: PayloadAction<{ key: string; value: IClickInteractions }>
		) => {
			const { key, value } = action.payload;
			state.staticContent.clickEvents[key] = value;
		},

		setVisitorID: (state: AnalyticsState, action: PayloadAction<string>) => {
			state.visitorID = action.payload;
		}
	}
});

export const {
	setNewSectionView,
	onCommonClickDispatcher,
	onDarkModeTrigger,
	onFeaturedBlogView,
	onClickSocialHandle,
	onChangeContactForm,
	onBackImageViewed,
	onLogoHover,
	onClickEvent,
	setVisitorID
} = analyticsSlice.actions;
export default analyticsSlice.reducer;
