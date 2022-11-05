import { getApp, initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { browser } from '$app/environment';

export let firebase: FirebaseApp;

export default async () => {
	if (firebase) {
		return;
	}

	try {
		getApp();
	} catch (e) {
		let config;
		if (browser) {
			config = (await import('$lib/firebase/configBrowser')).default;
		} else {
			config = (await import('$lib/firebase/configServer')).default;
		}
		initializeApp(config);
	}

	return;
};
