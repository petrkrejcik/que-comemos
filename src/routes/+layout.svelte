<script lang="ts">
	import '../app.css'; // TODO: maybe to app.html
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import 'dayjs/locale/es.js';
	import getAuth from '$lib/firebase/getAuth';
	import dayjs from 'dayjs';
	import { inMemoryPersistence, setPersistence } from 'firebase/auth';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('🛎 ', 'layout.svelte');

	setPersistence(getAuth(), inMemoryPersistence);

	dayjs.locale('es');
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
