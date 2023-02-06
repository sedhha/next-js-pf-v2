import dynamic from 'next/dynamic';
const screens = {
	uploadImage: 'uploadImage'
} as const;

const UploadImage = dynamic(() => import('./UploadImage'));

const ScreenHandler = ({ screenKey }: { screenKey?: string }) => {
	switch (screenKey) {
		case screens.uploadImage:
			return <UploadImage />;
		default:
			return null;
	}
};

export default ScreenHandler;
export { screens };
