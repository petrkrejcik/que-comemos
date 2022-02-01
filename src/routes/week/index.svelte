<script>
  import { getWeekId } from '$lib/date';
  import WeekPlan from '$lib/weekPlan/WeekPlan.svelte';
</script>

<WeekPlan week={getWeekId()} time="lunch" />
