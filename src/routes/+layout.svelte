<script>
  import '../app.css';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import 'dayjs/locale/es.js';

  const queryClient = new QueryClient();

</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
