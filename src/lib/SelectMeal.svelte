<script>
  import { page } from '$app/stores';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { getMeals, getWeekPlan } from '$lib/firestoreCache';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import { getIcon } from '$lib/meal';
  import BackButton from '$lib/backButton.svelte';
  import { goto } from '$app/navigation';

  export let dayIndex;
  export let week;
  export let time; // e.g. lunch, dinner
  export let extra; // e.g. side-dish
  $: mealKey = extra ? `${time}-${extra}` : time;

  let weekPlan = {};
  const weekPlanRef = doc(db, 'weekPlans', week);

  $: meals = getMeals({ time: extra || time });
  getWeekPlan(week).subscribe({
    next: (result = []) => {
      weekPlan = result;
    },
    error: (error) => {
      console.log('🛎 ', 'error', error);
    }
  });

  const onChange = (meal) => () => {
    if (!meal) return;
    const icon = getIcon(meal.category);
    setDoc(
      weekPlanRef,
      {
        [dayIndex]: {
          ...(weekPlan[dayIndex] || {}),
          [mealKey]: {
            id: meal.id,
            name: meal.name,
            ...(icon && { icon: icon })
          },
          // If main dish changes, remove side dish (if exists)
          ...(weekPlan[dayIndex]?.[`${time}-side-dish`] &&
            meal.id !== weekPlan[dayIndex]?.[time]?.id && {
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
  <BackButton />
</AppBar>

<Content>
  <div class="max-w-sm mx-auto">
    <a href="/add" class="btn btn-ghost mr-0">Crear comida</a>
    <ul class="menu border bg-base-300 rounded-box overflow-auto">
      {#each $meals as meal}
        <li
          on:click={onChange(meal)}
          class={weekPlan[dayIndex]?.[mealKey]?.id === meal.id && 'bg-gray-800'}
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
