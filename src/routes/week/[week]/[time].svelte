<script>
  import { page } from '$app/stores';
  import WeekPlan from '$pages/WeekPlan.svelte';

  $: week = $page.params.week;
  $: time = $page.params.time;
</script>

<WeekPlan {week} {time} />
