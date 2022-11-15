import { ID_TOKEN_QUERY_PARAM, REFRESH_TOKEN_QUERY_PARAM } from '$lib/consts';
import getAuth from '$lib/firebase/getAuth';
import { getFirebaseAdmin } from '$lib/firebase/getFirebaseAdmin.server';
import type { Handle } from '@sveltejs/kit';
import { signInWithCustomToken, type UserCredential } from 'firebase/auth';

/**
 * Check the validity of the `idToken` and eventually tries to refresh it.
 * Updates `idToken` and `refreshToken` in cookies.
 */
export const verifySession = async (
	event: Parameters<Handle>[0]['event']
): Promise<UserCredential['user'] | false> => {
	const idToken = event.cookies.get(ID_TOKEN_QUERY_PARAM);
	const refreshToken = event.cookies.get(REFRESH_TOKEN_QUERY_PARAM);

	if (!idToken && !refreshToken) return false;

	let uid: string;
	try {
		const decodedIdToken = await getFirebaseAdmin()
			.auth()
			.verifyIdToken(idToken || '');
		uid = decodedIdToken.uid;
		if (!decodedIdToken.groupId) {
			return false;
		}
	} catch (e) {
		const response = await event.fetch(
			`https://securetoken.googleapis.com/v1/token?key=${getAuth().app.options.apiKey}`,
			{
				method: 'POST',
				body: JSON.stringify({
					grant_type: 'refresh_token',
					refresh_token: refreshToken
				})
			}
		);
		if (response.status !== 200) {
			return false;
		}
		const { refresh_token, id_token, user_id } = await response.json();
		if (!user_id) {
			return false;
		}
		uid = user_id;
		event.cookies.set(ID_TOKEN_QUERY_PARAM, id_token, {
			path: '/'
		});
		event.cookies.set(REFRESH_TOKEN_QUERY_PARAM, refresh_token, {
			path: '/'
		});
	}

	const customToken = await getFirebaseAdmin().auth().createCustomToken(uid);
	const { user } = await signInWithCustomToken(getAuth(), customToken);
	const { groupId } = (await user.getIdTokenResult()).claims;

	if (!groupId) {
		console.error(`No groupId in claims. UID: ${uid}`);
		return false;
	}

	event.locals.user = {
		displayName: user.displayName,
		token: customToken,
		groupId
	};

	return user;
};
