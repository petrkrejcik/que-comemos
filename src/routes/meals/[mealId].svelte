<script>
  import { page } from '$app/stores';
  import AddEditMeal from '$lib/AddEditMeal.svelte';

  let mealId = $page.params.mealId;
</script>

<AddEditMeal {mealId} />
