<script>
  import { getWeekId } from '$lib/date';
  import WeekPlan from '$pages/WeekPlan.svelte';

  // TODO: redirect to /week
</script>

<WeekPlan week={getWeekId()} time="lunch" />
