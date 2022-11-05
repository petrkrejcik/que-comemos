<script>
	import { getWeekId } from '$lib/date';
	import WeekPlan from '$pages/WeekPlan.svelte';
</script>

<WeekPlan week={getWeekId()} time="lunch" />
