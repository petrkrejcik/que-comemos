<script lang="ts">
	import { page } from '$app/stores';
	import WeekPlan from '$pages/WeekPlan.svelte';
	import { hydrate } from '@sveltestack/svelte-query';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('🛎 ', 'page.svelte; hydrate');

	/**
	 * It's annoying to run the hydration manually in every component.
	 * Maybe create some hook `useHydration`.
	 */
	if (data.queryClientState) {
		hydrate(data.queryClient, data.queryClientState);
	}

	$: week = $page.params.week;
	$: time = $page.params.time;
</script>

<WeekPlan {week} {time} />
