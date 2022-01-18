import { authState } from 'rxfire/auth';
import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { map } from 'rxjs/operators';

// let resolve;
// export let user = writable();
// export const awaitUser = new Promise(
//   (resolveInner) => (resolve = resolveInner)
// );

export const user = authState(auth).pipe(
  map((user) => {
    console.log('🛎 ', 'ionUser', user);
    return user ? user : null;
  })
);
