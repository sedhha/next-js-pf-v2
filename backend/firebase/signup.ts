import { IResult } from '@/interfaces/api';
import { store, auth } from '@/firebase/index';
import { getNewsLetterPath } from '@/firebase/constants';
import { INewsletter } from '@/interfaces/newsletter';

const signUpForEmailNewsletter = async (
	email?: string
): Promise<IResult<null>> => {
	if (!email)
		return {
			statusCode: 422,
			message: 'Email not provided for signup.',
			error: true
		};
	if (typeof email !== 'string')
		return {
			statusCode: 422,
			message: 'One Email allowed at a time. :/'
		};
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const valid = re.test(email);
	if (!valid)
		return {
			statusCode: 422,
			message: 'Incorrect email address provided!',
			error: true
		};
	const newsletterPath = getNewsLetterPath();
	const storeCollection = store.collection(newsletterPath);
	return storeCollection
		.where('email', '==', email)
		.get()
		.then((snapshot) => {
			if (!snapshot.empty) {
				return {
					statusCode: 409,
					message: 'Email already subscribed!',
					error: true
				};
			}
			return storeCollection
				.doc()
				.create({
					email,
					signedUpAt: new Date().getTime(),
					subscribed: false
				} as INewsletter)
				.then(() => {
					return {
						statusCode: 200,
						message: 'Email successfully subscribed!',
						error: false
					};
				})
				.catch((error) => ({
					statusCode: 500,
					message: error.message,
					error: true
				}));
		})
		.catch((err) => ({
			statusCode: 500,
			message: err.message,
			error: true
		}));
};

const updateCustomClaims = async (
	uid: string,
	claims: Record<string, string | number | boolean>
): Promise<{ error: boolean; message?: string }> =>
	auth
		.getUser(uid)
		.then(async (user) => {
			const existingClaims = user.customClaims;
			return auth
				.setCustomUserClaims(uid, {
					...existingClaims,
					...claims
				})
				.then(() => ({
					error: false
				}));
		})
		.catch((err) => {
			console.error(
				'Errored Occured while trying to fetch User: ',
				err.message,
				err.code,
				uid
			);
			return {
				error: true
			};
		});

const subscribeDocument = async (
	id: string,
	uid: string,
	maxRetries = 3
): Promise<IResult<null>> => {
	if (maxRetries <= 0)
		return {
			error: true,
			statusCode: 500,
			message: 'Max retries exceeded while subscribiing to newsletter!'
		};
	const newsletterPath = getNewsLetterPath();
	const storeCollection = store.collection(newsletterPath);
	return storeCollection
		.doc(id)
		.set({ subscribed: true, uid } as INewsletter, { merge: true })
		.then(() => ({
			error: false,
			statusCode: 201,
			message: 'Successfully added Newsletter'
		}))
		.catch((err) => {
			console.error(err.message);
			return subscribeDocument(id, uid, maxRetries - 1);
		});
};
const completeSubscription = async (
	email: string,
	uid: string
): Promise<IResult<null>> => {
	if (!email || !uid)
		return {
			error: true,
			statusCode: 422,
			message: `Email (${email}) or UID (${uid}) not provided!`
		};

	const newsLetterPath = getNewsLetterPath();
	const collection = store.collection(newsLetterPath);
	return collection
		.where('email', '==', email)
		.get()
		.then((snapshot) => {
			if (snapshot.empty)
				return {
					error: false,
					statusCode: 204
				};
			const id = snapshot.docs.map((document) => document.id)[0];
			return subscribeDocument(id, uid, 3).then((res) => {
				updateCustomClaims(id, { newsletterSubscribed: true });
				return res;
			});
		})
		.catch((err) => ({
			error: true,
			statusCode: 500,
			message: err.message
		}));
};

export { signUpForEmailNewsletter, completeSubscription };
