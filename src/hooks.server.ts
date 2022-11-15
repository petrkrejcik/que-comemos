import type { Handle, HandleServerError } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/consts';
import dayjs from 'dayjs';
import initialiseFirebase from '$lib/firebase/initialiseFirebase';
import { QueryClient } from '@sveltestack/svelte-query';
import { verifySession } from '$lib/auth/verifySession.server';

dayjs.locale('es');

const queryClient = new QueryClient();

export const handle: Handle = async function handle({ event, resolve }) {
	await initialiseFirebase();

	event.locals.queryClient = queryClient;
	const url = event.request.url;
	const isLoginRoute = url
		.split('/')
		.some((part) => part.startsWith('login') || part.startsWith('initSession'));

	const user = await verifySession(event);

	if (user) {
		if (isLoginRoute) {
			return Response.redirect(`${event.url.origin}`, 302);
		}
	} else {
		if (!isLoginRoute) {
			return Response.redirect(`${event.url.origin}/login`, 302);
		}
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
