import { initializeApp, getApp, cert } from 'firebase-admin/app';

export const getFirebaseAdmin = () => {
	try {
		return getApp('admin');
	} catch (e) {
		const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);

		return initializeApp(
			{
				credential: cert(serviceAccount),
				databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com'
			},
			'admin'
		);
	}
};
