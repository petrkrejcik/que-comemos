<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/env';
  import { authStore } from '$lib/auth/firebaseAuth';

  $: if (browser && $authStore.firebaseControlled && !$authStore.isLogged) {
    goto('/login', { state: { referer: window.location.pathname } });
  }
</script>

<header>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
    <div class="flex-none">
      <!-- <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current text-success"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button> -->
    </div>
    <div class="flex-1 px-2 mx-2">
      <span class="text-lg font-bold" />
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</header>
<main class="container mx-auto">
  <slot />
</main>
