<script lang="ts">
	import { joinMeals } from '$lib/meal/meal';
	import AppBar from '$components/AppBar/AppBar.svelte';
	import Content from '$components/Content/Content.svelte';
	import { authStore } from '$lib/auth/authStore';
	import { getWeekPlan } from '$lib/weekPlan/weekPlanApi';
	import { goto } from '$app/navigation';
	import { decrementWeek, getWeekRelative, incrementWeek } from '$lib/date';
	import longpress from '$actions/longpress';
	import dayjs from 'dayjs';
	import { doc, setDoc } from 'firebase/firestore';
	import getFirestore from '$lib/firebase/getFirestore';
	import type { WeekPlan } from '$lib/weekPlan/weekPlanType';

	export let week: string;
	export let time: string = 'lunch';
	let editingDay: string | number | null;
	$: groupId = $authStore.groupId;

	$: firstDay = dayjs(week);
	$: days = Array.from({ length: 7 }, (_, i) => dayjs(firstDay).add(i, 'day'));

	$: weekPlan = getWeekPlan(week, groupId);

	const clearDay = async (day) => {
		if (!groupId) {
			throw new Error('No group ID');
		}
		const dayIndex = `d${day}`;
		const { [time]: omit, ...restDay } = $weekPlan.data[dayIndex] || {};
		const newWeekPlan = {
			...$weekPlan.data,
			[dayIndex]: restDay
		};
		await setDoc(doc(getFirestore(), `groups/${groupId}/weekPlans`, week), newWeekPlan);
		editingDay = null;
	};
</script>

<AppBar>
	<div class="flex text-center items-center text-white w-72 mx-auto">
		<span on:click={goto(`/week/${decrementWeek(week)}`)} class="btn btn-circle text-xl">❮</span>
		<div class="text-lg grow">
			{getWeekRelative(week)}
		</div>
		<span on:click={goto(`/week/${incrementWeek(week)}`)} class="btn btn-circle text-xl">❯</span>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<button class="btn btn-square btn-ghost ">
				<div class="h-12 w-12 hamburgerIcon bg-no-repeat bg-white" />
			</button>
			<ul tabindex="0" class="shadow menu dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<a class="text-black" href="/meals">Lista de comidas</a>
				</li>
			</ul>
		</div>
	</div>
</AppBar>

<Content>
	<div class="w-full">
		<div class="tabs max-w-sm mb-4 mx-auto">
			<!-- Not using <a> because of infinite prerender loop -->
			<a
				class="text-inherit	text-base tab tab-bordered flex-grow uppercase h-10 {time === 'lunch' &&
					'tab-active'}"
				href={`/week/${week}/lunch`}>Comida</a
			>
			<a
				class="text-inherit text-base tab tab-bordered flex-grow uppercase h-10 {time ===
					'dinner' && 'tab-active'}"
				href={`/week/${week}/dinner`}>Cena</a
			>
		</div>
		<ul class="divide-y divide-zinc-800">
			{#each days as day, i}
				<div
					class="max-w-sm mx-auto flex items-center py-2"
					use:longpress
					on:longpress={() => {
						if ($weekPlan.data?.[`d${i}`]?.[time]) {
							// Allow edit only of displayed meal
							editingDay = i;
						}
					}}
				>
					<div class="avatar placeholder mr-10">
						<div
							class={`bg-neutral text-gray-400 rounded-full w-12 h-12 ${
								day.isSame(dayjs(), 'day') && 'border-2 border-lime-500'
							} `}
						>
							<span class="capitalize">{day.format('dd')}</span>
						</div>
					</div>
					<div class="w-full flex items-center h-12">
						{#if $weekPlan.isLoading}
							<div class="w-44 h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
						{:else if $weekPlan.data?.[`d${i}`]?.[time]}
							{#if editingDay === i}
								<div>
									<button on:click={() => clearDay(i)} class="btn btn-ghost btn-primary"
										>Eliminar</button
									>
									<button on:click={() => (editingDay = null)} class="btn">Cancelar</button>
								</div>
							{:else}
								<a class="link link-hover " href={`/week/${week}/${time}/${i}`}>
									{joinMeals([
										$weekPlan.data?.[`d${i}`][time],
										$weekPlan.data?.[`d${i}`][`${time}-side-dish`]
									])}
								</a>
							{/if}
						{:else}
							<button class="btn btn-ghost" on:click={goto(`/week/${week}/${time}/${i}`)}
								>Elegir</button
							>
						{/if}
					</div>
				</div>
			{/each}
		</ul>
	</div>
</Content>

<style>
	.hamburgerIcon {
		mask-image: url(/icons/hamburgerMenu.svg);
		mask-repeat: no-repeat;
		mask-position: center;
	}
</style>
