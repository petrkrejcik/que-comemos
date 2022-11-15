<script lang="ts">
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { ID_TOKEN_QUERY_PARAM, REFRESH_TOKEN_QUERY_PARAM } from '$lib/consts';
	import getAuth from '$lib/firebase/getAuth';

	const login = async () => {
		try {
			const userCredential = await signInWithPopup(getAuth(), new GoogleAuthProvider());
			if (!userCredential) {
				throw new Error('Login failed');
			}
			const token = await userCredential.user.getIdToken();
			const refershToken = await userCredential.user.refreshToken;
			goto(
				`/initSession?${ID_TOKEN_QUERY_PARAM}=${token}&${REFRESH_TOKEN_QUERY_PARAM}=${refershToken}`,
				{ invalidateAll: true }
			);
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="h-screen w-full flex justify-center items-center flex-col">
	<h1 class="mb-8 text-3xl">Que comemos?</h1>
	<button class="btn btn-primary" on:click={login}>Sign In with Google</button>
</div>
