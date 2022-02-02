import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';

export const authStore = writable<{
  isLogged: boolean;
  user?: any;
  firebaseControlled: boolean;
}>({
  user: undefined,
  isLogged: false,
  firebaseControlled: false
});

auth.onAuthStateChanged((user) => {
  authStore.set({
    isLogged: user !== null,
    user,
    firebaseControlled: true
  });
});
