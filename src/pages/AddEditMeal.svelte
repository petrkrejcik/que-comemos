<script lang="ts">
	import { writable } from 'svelte/store';
	import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
	import AppBar from '$components/AppBar/AppBar.svelte';
	import Content from '$components/Content/Content.svelte';
	import { CATEGORIES } from '$lib/meal/meal';
	import BackButton from '$components/Button/BackButton.svelte';
	import { getMeal } from '$lib/meal/mealApi';
	import { authStore } from '$lib/auth/authStore';
	import getFirestore from '$lib/firebase/getFirestore';

	export let mealId: string;
	$: groupId = $authStore.groupId;

	const meal = writable({
		name: '',
		category: '',
		eatFor: 'lunch',
		forChild: true,
		withSideDish: false
	});

	$: if (mealId) {
		getMeal(mealId, groupId).subscribe((result) => {
			if (result.data) {
				meal.set(result.data);
			}
		});
	}

	const onSubmit = () => {
		if (!groupId) {
			throw new Error('No group ID');
		}
		if (mealId) {
			updateDoc(doc(getFirestore(), `groups/${groupId}/meals/${mealId}`), $meal);
		} else {
			addDoc(collection(getFirestore(), `groups/${groupId}/meals`), $meal);
		}
		history.back();
	};

	const eatFor = [
		{ value: 'lunch', text: 'Comida' },
		{ value: 'dinner', text: 'Cena' },
		{ value: 'side-dish', text: 'Acompañamiento' }
	];
</script>

<AppBar>
	<BackButton />
</AppBar>

<Content>
	<form on:submit|preventDefault={onSubmit} class="flex flex-col form-control">
		<label class="label" for="meal">
			<span class="label-text text-inherit">Nombre</span>
		</label>
		<input
			type="text"
			placeholder="Como se llama la comida?"
			class="input mb-4 text-black"
			id="meal"
			bind:value={$meal.name}
		/>

		<select
			class="select select-bordered w-full max-w-xs text-black mb-4"
			id="category"
			bind:value={$meal.category}
		>
			<option disabled value="">Categoría</option>
			{#each CATEGORIES as category}
				<option value={category.value}>{category.text}</option>
			{/each}
		</select>

		<select
			class="select select-bordered w-full max-w-xs text-black mb-4"
			bind:value={$meal.eatFor}
		>
			<option disabled value="">Tipo</option>
			{#each eatFor as time}
				<option value={time.value}>{time.text}</option>
			{/each}
		</select>

		<label class="cursor-pointer label">
			<span class="label-text text-inherit">También para niños</span>
			<input type="checkbox" class="checkbox" bind:checked={$meal.forChild} />
		</label>

		<label class="cursor-pointer label">
			<span class="label-text text-inherit">Puede tener acompañamiento</span>
			<input type="checkbox" class="checkbox" bind:checked={$meal.withSideDish} />
		</label>

		<button type="submit" class="btn btn-primary mt-4">Guardar</button>
	</form>
</Content>
