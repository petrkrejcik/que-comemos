// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: Pick<import('firebase/auth').UserCredential['user'], 'displayName'> & {
			token: string;
			groupId: string;
		};
		queryClient: import('@sveltestack/svelte-query').QueryClient;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
