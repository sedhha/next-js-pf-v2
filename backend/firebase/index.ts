import admin from 'firebase-admin';

const keyString = process.env.FB_ADMIN_PRIVATE_KEY ?? '{"privateKey": ""}';

const { privateKey } = JSON.parse(keyString);

if (privateKey === '') {
	console.info('FIREBASE_PRIVATE_KEY is not set');
}

if (admin.apps.length === 0)
    admin.initializeApp({
        credential: admin.credential.cert({
            clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
            privateKey: privateKey,
            projectId: process.env.FB_ADMIN_PROJECT_ID,
        }),
    });

const auth = admin.auth();
const store = admin.firestore();

export { auth, store };