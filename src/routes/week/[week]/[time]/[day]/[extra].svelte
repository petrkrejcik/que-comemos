<script>
  import { page } from '$app/stores';
  import SelectMeal from '$lib/SelectMeal.svelte';

  let dayIndex = `d${$page.params.day}`;
  let week = $page.params.week;
  $: time = $page.params.time;
  let extra = $page.params.extra;
</script>

<SelectMeal {dayIndex} {week} {time} {extra} />
