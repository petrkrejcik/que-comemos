import type { Handle, HandleServerError } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/consts';
import { getUser } from '$lib/auth/getUser.server';
import dayjs from 'dayjs';
import initialiseFirebase from '$lib/firebase/initialiseFirebase';
import { QueryClient } from '@sveltestack/svelte-query';

dayjs.locale('es');
const queryClient = new QueryClient();

export const handle: Handle = async function handle({ event, resolve }) {
	event.locals.queryClient = queryClient;
	const url = event.request.url;
	const isLoginRoute = url
		.split('/')
		.some((part) => part.startsWith('login') || part.startsWith('initSession'));
	const token = event.cookies.get(SESSION_COOKIE_NAME);

	await initialiseFirebase();

	const user = await getUser(token);

	if (user) {
		if (isLoginRoute) {
			return Response.redirect(`${event.url.origin}`, 302);
		}
	} else {
		if (!isLoginRoute) {
			return Response.redirect(`${event.url.origin}/login`, 302);
		}
	}

	if (user) {
		try {
			await user.getIdTokenResult();
		} catch (e) {}
		const idTokenResult = await user.getIdTokenResult();
		if (!idTokenResult.claims.groupId) {
			throw new Error('Group id not set');
		}
		if (!token) {
			throw new Error('Token not set');
		}
		event.locals.user = {
			displayName: user.displayName,
			token: token,
			groupId: idTokenResult.claims.groupId as string
		};
	}

	const response = await resolve(event);

	return response;
};

export const handleError: HandleServerError = function handleError({ error }) {
	console.error(error);
	let code = 'UNKNOWN';
	if (error instanceof Error) {
		code = error.message;
	} else if (error && typeof error === 'object' && Object.hasOwn(error, 'code')) {
		code = (error as { code: string }).code;
	}
	return {
		message: 'Whoops!',
		code
	};
};
