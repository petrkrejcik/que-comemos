import getAuth from '$lib/firebase/getAuth';
import { getErrorMessage } from '$lib/utils';
import { signInWithCustomToken, type UserCredential } from 'firebase/auth';

export const getUser = async (token?: string | null): Promise<UserCredential['user'] | false> => {
	if (!token) return false;
	try {
		console.log('🛎 ', 'signInWithCustomToken', token);
		const user = await signInWithCustomToken(getAuth(), token);
		return user.user;
	} catch (e) {
		console.error(`❌ ${getErrorMessage(e)}`);
		return false;
	}
};
