<script>
	import { getMeals } from '$lib/meal/mealApi';
	import AppBar from '$components/AppBar/AppBar.svelte';
	import Content from '$components/Content/Content.svelte';
	import { getIcon } from '$lib/meal/meal';
	import { getRoute, ROUTES } from '$lib/routes';
	import BackButton from '$components/Button/BackButton.svelte';
	import { authStore } from '$lib/auth/authStore';

	$: groupId = $authStore.groupId;
	$: meals = getMeals(groupId);
</script>

<AppBar>
	<div class="flex-1">
		<BackButton />
	</div>
	<a href="/add" class="btn btn-ghost mr-0"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			class="inline-block w-6 h-6 text-success fill-gray-400"
			><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg
		></a
	>
</AppBar>

<Content>
	<div class="max-w-sm mx-auto">
		<ul class="menu overflow-auto">
			{#each $meals.data || [] as meal}
				<li>
					<a href={getRoute(ROUTES.editMeal, { id: meal.id })}>
						{[getIcon(meal.category), meal.name].filter(Boolean).join(' ')}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Content>
