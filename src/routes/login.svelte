<script context="module">
  import { getWeekId } from '$lib/date';
  import { authStore } from '$lib/auth/firebaseAuth';

  export async function load() {
    if (authStore.firebaseControlled && !authStore.isLogged) {
      console.log('🛎 ', 'not logged, no redirect');
      return {};
    }
    // Redirect to main page if don't know if a user is logged in yet
    // User will see skeleton until we know wheter he is logged in or not
    // Later we redirect him to login again eventually
    return {
      status: 301,
      redirect: `/week/${getWeekId(0)}/lunch`
    };
  }
</script>

<script>
  import { signInWithPopup } from 'firebase/auth';
  import { auth, authProvider } from '$lib/firebase';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';

  $: user = $authStore.user;
  $: if (browser && user) {
    console.log('🛎 ', 'redirect', history.state?.referer || '/');
    // goto(history.state?.referer || '/');
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
