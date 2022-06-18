import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';

export type AuthStore = {
  isLogged: boolean;
  user?: any;
  groupId: string;
  firebaseControlled: boolean;
}

export const authStore = writable<AuthStore>({
  user: undefined,
  groupId: '',
  isLogged: false,
  firebaseControlled: false,
});

auth.onAuthStateChanged(async (user) => {
  let groupId = '';
  if (user) {
    const token = await user.getIdTokenResult();
    groupId =
      typeof token.claims.groupId === 'string' ? token.claims.groupId : '';
  }
  authStore.set({
    isLogged: user !== null,
    user,
    groupId,
    firebaseControlled: true,
  });
});
