import { firebase } from '$lib/firebase/initialiseFirebase';
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';

export default () => {
	const auth = getAuth(firebase);

	initialiseEmulators(auth);

	return auth;
};

let emulatorsInitialised = false;

const initialiseEmulators = (auth: Auth) => {
	if (import.meta.env.DEV) {
		if (!emulatorsInitialised) {
			console.info('Using Firebase Auth emulator');

			connectAuthEmulator(auth, 'http://localhost:9099');
			emulatorsInitialised = true;
		}
	}
};
