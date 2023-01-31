export interface IFirebaseUser {
	email?: string;
	uid: string;
	idToken: string;
	subscriptionPending: boolean;
	isAdmin: boolean;
}
