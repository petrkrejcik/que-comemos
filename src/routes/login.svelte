<script context="module">
  export const prerender = true;
</script>

<script>
  import { authStore } from '$lib/auth/firebaseAuth';
  import { signInWithPopup } from 'firebase/auth';
  import { auth, authProvider } from '$lib/firebase';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';

  $: user = $authStore.user;
  $: if (browser && user) {
    goto(history.state?.referer || '/');
  }

  const login = () => {
    signInWithPopup(auth, authProvider).catch((error) => {
      console.log('🛎 ', 'error during login', error);
    });
  };
</script>

<div class="h-screen w-full flex justify-center items-center flex-col">
  <h1 class="mb-8 text-3xl">Que comemos?</h1>
  <button class="btn btn-primary" on:click={login}>Sign In with Google</button>
</div>
