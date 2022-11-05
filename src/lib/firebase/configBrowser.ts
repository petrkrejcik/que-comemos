import type { FirebaseOptions } from 'firebase/app';

const config: FirebaseOptions = {
	apiKey: 'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU',
	authDomain: 'que-comemos-hoy-5febf.firebaseapp.com',
	databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com',
	projectId: 'que-comemos-hoy-5febf',
	storageBucket: 'que-comemos-hoy-5febf.appspot.com',
	messagingSenderId: '545019553365',
	appId: '1:545019553365:web:333935cb9e69e47e4196dc'
};

export default config;

// let emulatorsInitialised = false
// if (import.meta.env.DEV) {
// 	if (!firebaseApp && !emulatorsInitialised) {
// 		console.log('🛎 ', 'emul client');
// 		connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
// 		emulatorsInitialised = true
// 		// connectAuthEmulator(auth, 'http://localhost:9099');
// 	}
// }
// } else {
//   enableIndexedDbPersistence(db).catch((err) => {
//     if (err.code == 'failed-precondition') {
//       // Multiple tabs open, persistence can only be enabled
//       // in one tab at a a time.
//       // ...
//     } else if (err.code == 'unimplemented') {
//       // The current browser does not support all of the
//       // features required to enable persistence
//       // ...
//     }
//   });
// }
