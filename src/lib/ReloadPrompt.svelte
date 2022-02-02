<script>
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  // replaced dynamically
  const buildDate = '__DATE__';
  // replaced dynamically: we need to use `JSON.parse` to allow compare to reloadSW==='true'
  // if used with literal it will be removed, since it is evaluated at build time by sveltekit
  const reloadSW = JSON.parse('__RELOAD_SW__');
  const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      if (reloadSW === 'true') {
        r &&
          setInterval(() => {
            console.log('Checking for sw update');
            r.update();
          }, 20000 /* 20s for testing purposes */);
      } else {
        console.log(`SW Registered: ${r}`);
      }
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    }
  });
  const close = () => {
    offlineReady.set(false);
    needRefresh.set(false);
  };
</script>

{#if $needRefresh}
  <div class="alert flex-row sticky top-[100vh] w-11/12 mx-auto mb-4">
    <div class="flex-1">
      <span class="mx-3"
        >New content available, click on reload button to update.</span
      >
    </div>
    <div class="flex-none mt-0">
      <button class="btn btn-sm btn-ghost mr-2" on:click={close}>Close</button>
      <button
        class="btn btn-sm btn-primary"
        on:click={() => updateServiceWorker(true)}>Reload</button
      >
    </div>
  </div>
{/if}
