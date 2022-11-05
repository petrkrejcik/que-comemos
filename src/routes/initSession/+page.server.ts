import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getFirebaseAdmin } from '$lib/firebase/getFirebaseAdmin.server';
import { SESSION_COOKIE_NAME } from '$lib/consts';

export const load: PageServerLoad = async function load(event) {
	const url = new URL(event.request.url);
	// TODO: The query params should be called `idToken`
	const token = url.searchParams.get(SESSION_COOKIE_NAME);

	if (!token) {
		return {};
	}

	try {
		const { uid, groupId } = await getFirebaseAdmin().auth().verifyIdToken(token);
		const customToken = await getFirebaseAdmin()
			.auth()
			.createCustomToken(uid, { ...(groupId && { groupId }) });
	
		event.cookies.set(SESSION_COOKIE_NAME, customToken, {
			path: `/`
		});
	
		throw redirect(307, `/`);
	} catch (e) {
		throw e
	}
};
