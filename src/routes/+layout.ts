import { browser } from '$app/environment';
import { authStore } from '$lib/auth/authStore';
import getAuth from '$lib/firebase/getAuth';
import initialiseFirebase from '$lib/firebase/initialiseFirebase';
import { hydrate, QueryClient } from '@sveltestack/svelte-query';
import { inMemoryPersistence, setPersistence, signInWithCustomToken } from 'firebase/auth';
import type { LayoutLoad } from './$types';

const queryClient = new QueryClient();

export const load: LayoutLoad = async ({ data }) => {
	console.log('🛎 ', 'layout.ts');
	
	await initialiseFirebase();
	
	setPersistence(getAuth(), inMemoryPersistence);

	if (data.user) {
		await signInWithCustomToken(getAuth(), data.user.token);
		authStore.set({ groupId: data.user.groupId });
	}

	return { queryClient };
};
