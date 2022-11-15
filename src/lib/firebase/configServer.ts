import type { FirebaseOptions } from 'firebase/app';

const config: FirebaseOptions = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY_NON_RESTRICTED as string,
	authDomain: 'que-comemos-hoy-5febf.firebaseapp.com',
	databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com',
	projectId: 'que-comemos-hoy-5febf',
	storageBucket: 'que-comemos-hoy-5febf.appspot.com',
	messagingSenderId: '545019553365',
	appId: '1:545019553365:web:333935cb9e69e47e4196dc'
};

export default config;
