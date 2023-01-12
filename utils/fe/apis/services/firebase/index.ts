import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyD01-bTinwiuHNHlulnKS3wZ5XGlw0tm78',
	authDomain: 'shivam-sahil.firebaseapp.com',
	projectId: 'shivam-sahil',
	storageBucket: 'shivam-sahil.appspot.com',
	messagingSenderId: '587027151737',
	appId: '1:587027151737:web:166bb9902b7295fbe14da8',
	measurementId: 'G-LLWD0VQTJ2',
	databaseURL:
		'https://shivam-sahil-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase
if (getApps().length === 0) {
	initializeApp(firebaseConfig);
}
const app = getApp();

export default app;
