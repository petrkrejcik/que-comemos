import { dev } from '$app/env';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU',
  authDomain: 'que-comemos-hoy-5febf.firebaseapp.com',
  databaseURL: 'https://que-comemos-hoy-5febf.firebaseio.com',
  projectId: 'que-comemos-hoy-5febf',
  storageBucket: 'que-comemos-hoy-5febf.appspot.com',
  messagingSenderId: '545019553365',
  appId: '1:545019553365:web:333935cb9e69e47e4196dc'
};

let firebaseApp;
try {
  firebaseApp = getApp();
} catch (error) {
  firebaseApp = initializeApp(firebaseConfig);
}

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const authProvider = new GoogleAuthProvider();

if (dev) {
  connectFirestoreEmulator(db, 'localhost', 8080);
} else {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
}
