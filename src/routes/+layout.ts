import { authStore } from '$lib/auth/authStore';
import getAuth from '$lib/firebase/getAuth';
import initialiseFirebase from '$lib/firebase/initialiseFirebase';
import { hydrate, QueryClient } from '@sveltestack/svelte-query';
import { signInWithCustomToken } from 'firebase/auth';
import type { LayoutLoad } from './$types';

const queryClient = new QueryClient();

export const load: LayoutLoad = async ({ data }) => {
	console.log('🛎 ', 'layout.ts');
	await initialiseFirebase();

	if (data.user) {
		await signInWithCustomToken(getAuth(), data.user.token);
		/**
		 * This is done just once. If a user logs in then the `groupId` is not set.
		 * We need to set the groupId after log in.
		 */
		console.log('🛎 ', 'setting groupid', data.user.groupId);
		authStore.set({ groupId: data.user.groupId });
	}

	return { queryClient };
};
