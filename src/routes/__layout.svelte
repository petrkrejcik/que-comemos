<script>
  import '../app.css';
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { getWeekId } from '$lib/date';

  $: if (browser && !$authStore.isLogged) {
    if ($authStore.firebaseControlled) {
      goto('/login', { state: { referer: window.location.pathname } });
    } else {
      // Redirect to main page if don't know if a user is logged in yet
      // User will see skeleton until we know wheter he is logged in or not
      // Later we redirect him to login again eventually
      goto(`/week/${getWeekId(0)}/lunch`);
    }
  }
</script>

<slot />
