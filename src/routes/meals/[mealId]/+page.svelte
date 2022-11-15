<script>
	import { page } from '$app/stores';
	import AddEditMeal from '$pages/AddEditMeal.svelte';

	let mealId = $page.params.mealId;
</script>

<AddEditMeal {mealId} />
