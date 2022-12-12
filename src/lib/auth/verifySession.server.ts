import { ID_TOKEN_QUERY_PARAM, REFRESH_TOKEN_QUERY_PARAM } from '$lib/consts';
import { getFirebaseAdmin } from '$lib/firebase/getFirebaseAdmin.server';
import type { Handle } from '@sveltejs/kit';
import { getAuth } from 'firebase-admin/auth';

/**
 * Check the validity of the `idToken` and eventually tries to refresh it.
 * Updates `idToken` and `refreshToken` in cookies.
 */
export const verifySession = async (event: Parameters<Handle>[0]['event']): Promise<boolean> => {
	console.log('🛎 ', 'verify');
	let idToken = event.cookies.get(ID_TOKEN_QUERY_PARAM);
	let refreshToken = event.cookies.get(REFRESH_TOKEN_QUERY_PARAM);

	if (!idToken && !refreshToken) return false;

	let uid: string;
	try {
		const decodedIdToken = await getAuth(getFirebaseAdmin()).verifyIdToken(idToken || '');
		uid = decodedIdToken.uid;
		if (!decodedIdToken.groupId) {
			return false;
		}
	} catch (e) {
		console.log('🛎 ', 'refetch token');
		const response = await event.fetch(
			`https://securetoken.googleapis.com/v1/token?key=${'AIzaSyBfTjSCoH4xl6UFa31Eyj8h-Tf2ZxwPbmU'}`,
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
		idToken = id_token;
		refreshToken = refresh_token;
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

	const decodedIdToken = await getAuth(getFirebaseAdmin()).verifyIdToken(idToken || '');
	const groupId = decodedIdToken.groupId;

	if (!groupId) {
		console.error(`No groupId in claims. UID: ${uid}`);
		return false;
	}

	event.locals.user = {
		displayName: decodedIdToken.name,
		token: idToken || '',
		groupId
	};

	return true;
};
