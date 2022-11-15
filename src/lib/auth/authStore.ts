import getAuth from '$lib/firebase/getAuth';
import { writable } from 'svelte/store';

export type AuthStore = {
	user?: any;
	groupId: string;
};

export const authStore = writable<AuthStore>({
	user: undefined,
	groupId: ''
});

// getAuth().onAuthStateChanged(async (user) => {
// 	let groupId = '';
// 	if (user) {
// 		const token = await user.getIdTokenResult();
// 		groupId = typeof token.claims.groupId === 'string' ? token.claims.groupId : '';
// 	}
// 	authStore.set({
// 		user,
// 		groupId,
// 	});
// });
