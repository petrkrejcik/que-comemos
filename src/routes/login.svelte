<script>
  import { signInWithPopup } from 'firebase/auth';
  import { auth, authProvider } from '$lib/firebase';

  const login = () => {
    signInWithPopup(auth, authProvider).catch((error) => {
      console.log('🛎 ', 'error during login', error);
    });
  };
</script>

<div class="h-screen w-full flex justify-center items-center flex-col">
  <h1 class="mb-8 text-3xl">Que comemos?</h1>
  <button on:click={login}>Sign In with Google</button>
</div>
