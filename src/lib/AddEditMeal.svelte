<script>
  import { writable } from 'svelte/store';
  import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import { CATEGORIES } from '$lib/meal';
  import BackButton from '$lib/backButton.svelte';
  import { getMeal } from '$lib/meal/mealApi';

  export let mealId;

  const meal = writable({
    name: '',
    category: '',
    eatFor: '',
    forChild: true,
    withSideDish: false
  });

  if (mealId) {
    getMeal(mealId).subscribe((result) => {
      if (result.data) {
        meal.set(result.data);
      }
    });
  }

  const onSubmit = () => {
    if (mealId) {
      updateDoc(doc(db, `meals/${mealId}`), $meal);
    } else {
      addDoc(collection(db, 'meals'), $meal);
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
      <option disabled="disabled" value="">Categoría</option>
      {#each CATEGORIES as category}
        <option value={category.value}>{category.text}</option>
      {/each}
    </select>

    <select
      class="select select-bordered w-full max-w-xs text-black mb-4"
      bind:value={$meal.eatFor}
    >
      <option disabled="disabled" value="">Tipo</option>
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
      <input
        type="checkbox"
        class="checkbox"
        bind:checked={$meal.withSideDish}
      />
    </label>

    <button type="submit" class="btn btn-primary mt-4">Guardar</button>
  </form>
</Content>
