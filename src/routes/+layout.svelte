<script lang="ts">
	import '../app.css'; // TODO: maybe to app.html
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import 'dayjs/locale/es.js';
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import { onAuthStateChanged } from 'firebase/auth';
	import getAuth from '$lib/firebase/getAuth';

	export let data: PageData;

	// Authorizes client's queries to Firestore
	onAuthStateChanged(getAuth(), (user) => {
		return;
	});

	dayjs.locale('es');
</script>

<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
