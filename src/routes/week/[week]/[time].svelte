<script>
  import { page } from '$app/stores';
  import WeekPlan from '$lib/weekPlan/WeekPlan.svelte';

  $: week = $page.params.week;
  $: time = $page.params.time;
</script>

<WeekPlan {week} {time} />
