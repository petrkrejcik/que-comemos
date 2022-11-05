import { firebase } from '$lib/firebase/initialiseFirebase';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';

export default () => {
	const firestore = getFirestore(firebase);

	initialiseEmulators(firestore);

	return firestore;
};

let emulatorsInitialised = false;

const initialiseEmulators = (firestore: Firestore) => {
	if (import.meta.env.DEV) {
		if (!emulatorsInitialised) {
			console.info('Using Firestore emulator');

			connectFirestoreEmulator(firestore, 'localhost', 8080);
			emulatorsInitialised = true;
		}
	}
};
