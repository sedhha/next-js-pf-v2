import { getCurrentView } from '@/lib/stores/birthdayStore';

export const getViewComponent = () => {
	const currentView = getCurrentView();
	return currentView;
};
