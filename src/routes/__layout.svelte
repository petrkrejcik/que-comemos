<script>
  import '../app.css';
  import { goto } from '$app/navigation';
  import { browser, dev } from '$app/env';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { getWeekId } from '$lib/date';
  import { page } from '$app/stores';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import dayjs from 'dayjs';
  import 'dayjs/locale/es.js';
  import { onMount } from 'svelte';

  dayjs.locale('es');

  let ReloadPrompt;
  onMount(async () => {
    !dev &&
      browser &&
      (ReloadPrompt = (await import('$lib/ReloadPrompt.svelte')).default);
  });

  const ROUTES = ['/meals', '/week', '/'];

  $: if (browser && !$authStore.isLogged) {
    if ($authStore.firebaseControlled) {
      goto('/login', { state: { referer: window.location.pathname } });
    } else {
      if (!ROUTES.some((route) => $page.url.pathname.includes(route))) {
        // Redirect to main page if don't know if a user is logged in yet
        // User will see skeleton until we know wheter he is logged in or not
        // Later we redirect him to login again eventually.
        goto(`/week/${getWeekId(0)}/lunch`);
      }
    }
  }
  const queryClient = new QueryClient();
</script>

<svelte:head>
  {#if !dev && browser}
    <link rel="manifest" href="/_app/manifest.webmanifest" />
  {/if}
</svelte:head>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>

{#if ReloadPrompt}
  <svelte:component this={ReloadPrompt} />
{/if}
