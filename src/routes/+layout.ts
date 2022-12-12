import { authStore } from '$lib/auth/authStore';
// import getAuth from '$lib/firebase/getAuth';
import initialiseFirebase from '$lib/firebase/getFirebase';
import { QueryClient } from '@sveltestack/svelte-query';
// import { inMemoryPersistence, setPersistence } from 'firebase/auth';
import type { LayoutLoad } from './$types';

export const prerender = false;

const queryClient = new QueryClient();

export const load: LayoutLoad = async ({ data }) => {
	initialiseFirebase();
	
	// setPersistence(getAuth(), inMemoryPersistence);

	if (data.user) {
		authStore.set({ groupId: data.user.groupId });
	}

	return { queryClient };
};
