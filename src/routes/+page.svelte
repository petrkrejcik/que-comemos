<script lang="ts">
	import { getWeekId } from '$lib/date';
	import WeekPlan from '$pages/WeekPlan.svelte';
	import { hydrate } from '@sveltestack/svelte-query';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('🛎 ', 'page.svelte /; hydrate', data);

	/**
	 * @todo It's annoying to run the hydration manually in every component.
	 * Maybe create some hook `useHydration`.
	 */
	if (data.queryClientState) {
		hydrate(data.queryClient, data.queryClientState);
	}

	// TODO: redirect to /week?
</script>

<WeekPlan week={getWeekId()} />
