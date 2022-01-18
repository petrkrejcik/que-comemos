<script>
  import { page } from '$app/stores';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { getMeals, getWeekPlan } from '$lib/firestoreCache';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import { getIcon } from '$lib/meal';

  let dayIndex = `d${$page.params.day}`;
  let week = $page.params.week;
  let time = $page.params.time;

  let weekPlan = {};
  const weekPlanRef = doc(db, 'weekPlans', week);
  // const weekPlanRef = doc(db, `weekPlans/`, week);

  const meals = getMeals({ time });
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
    // setDoc(
    //   weekPlanRef_deprecated,
    //   {
    //     [dayIndex]: {
    //       [time]: {
    //         id: meal.id,
    //         name: meal.name,
    //         ...(icon && icon)
    //       }
    //     }
    //   },
    //   { merge: true }
    // );
    setDoc(
      weekPlanRef,
      {
        [dayIndex]: {
          [time]: {
            id: meal.id,
            name: meal.name,
            ...(icon && { icon: icon })
          }
        }
      },
      { merge: true }
    );
    history.back();
  };
</script>

<AppBar class="flex justify-between">
  <!-- <Button on:click={() => navigate('/')} icon="arrow_back" text color="white" /> -->
  <!-- <Button on:click={() => navigate('/add')} icon="add" text color="white" /> -->
</AppBar>

<Content>
  <div class="max-w-sm mx-auto">
    <a href="/add" class="btn btn-ghost mr-0">Crear comida</a>
    <ul class="menu max-h-full border bg-base-300 rounded-box">
      {#each $meals as meal}
        <li
          on:click={onChange(meal)}
          class={weekPlan[dayIndex]?.[time]?.id === meal.id && 'bg-gray-800'}
        >
          <a href={''}>
            {[getIcon(meal.category), meal.name].filter(Boolean).join(' ')}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</Content>
