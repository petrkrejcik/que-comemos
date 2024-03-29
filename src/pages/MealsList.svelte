<script lang="ts">
	import { page } from '$app/stores';
	import { doc, setDoc } from 'firebase/firestore';
	import AppBar from '$components/AppBar/AppBar.svelte';
	import Content from '$components/Content/Content.svelte';
	import { getIcon } from '$lib/meal/meal';
	import BackButton from '$components/Button/BackButton.svelte';
	import { goto } from '$app/navigation';
	import { filterStore } from '$lib/stores/filterStore';
	import { getMeals } from '$lib/meal/mealApi';
	import { getWeekPlan } from '$lib/weekPlan/weekPlanApi';
	import { authStore } from '$lib/auth/authStore';
	import getFirestore from '$lib/firebase/getFirestore';
	import type { TIME } from '$lib/types';

	export let dayIndex;
	export let week;
	export let time: TIME;
	export let extra: string | null = null; // e.g. side-dish
	$: groupId = $authStore.groupId;
	$: mealKey = extra ? `${time}-${extra}` : time;
	// To spread when saving; to highlight selected
	$: weekPlan = getWeekPlan(week, groupId);

	$: meals = getMeals(groupId, {
		time: extra || time,
		forChild: $filterStore.forChild
	});

	const onChange = (meal: string) => async () => {
		if (!meal) return;
		if (!groupId) {
			throw new Error('No group ID');
		}
		const icon = getIcon(meal.category);
		await setDoc(
			doc(getFirestore(), `groups/${groupId}/weekPlans`, week),
			{
				[dayIndex]: {
					...($weekPlan.data?.[dayIndex] || {}),
					[mealKey]: {
						id: meal.id,
						name: meal.name,
						...(icon && { icon: icon })
					},
					// If main dish changes, remove side dish (if exists)
					...($weekPlan.data?.[dayIndex]?.[`${time}-side-dish`] &&
						meal.id !== $weekPlan.data?.[dayIndex]?.[time]?.id && {
							[`${time}-side-dish`]: null
						})
				}
			},
			{ merge: true }
		);
		if (meal.withSideDish) {
			goto(`/week/${week}/${time}/${$page.params.day}/side-dish`);
		} else {
			goto(`/week/${week}/${time}`);
		}
	};
</script>

<AppBar>
	<div class="flex-1">
		<BackButton />
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<div class="btn btn-ghost rounded-btn">
				<svg
					focusable="false"
					aria-hidden="true"
					viewBox="0 0 24 24"
					class="inline-block w-10 h-10 text-success fill-gray-400"
					><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg
				>
			</div>
			<ul class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<label class="cursor-pointer label">
						<span class="label-text">Para niños</span>
						<input type="checkbox" class="checkbox" bind:checked={$filterStore.forChild} />
					</label>
				</li>
			</ul>
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
	</div>
</AppBar>

<Content>
	<div class="max-w-sm mx-auto">
		<ul class="menu overflow-auto">
			{#each $meals.data || [] as meal}
				<li
					on:click={onChange(meal)}
					class={$weekPlan.data?.[dayIndex]?.[mealKey]?.id === meal.id && 'bg-gray-800'}
				>
					<a href={''}>
						{[getIcon(meal.category), meal.name].filter(Boolean).join(' ')}
						{#if meal.withSideDish}
							<span class="ml-auto text-slate-400">❯</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</Content>
