<script lang="ts">
	import '../app.css'; // TODO: maybe to app.html
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import 'dayjs/locale/es.js';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('🛎 ', 'layout.svelte');

	dayjs.locale('es');
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
