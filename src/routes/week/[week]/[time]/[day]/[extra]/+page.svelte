<script>
	import { page } from '$app/stores';
	import MealsList from '$pages/MealsList.svelte';

	let dayIndex = `d${$page.params.day}`;
	let week = $page.params.week;
	$: time = $page.params.time;
	let extra = $page.params.extra;
</script>

<MealsList {dayIndex} {week} {time} {extra} />
