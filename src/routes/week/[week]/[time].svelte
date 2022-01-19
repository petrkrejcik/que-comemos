<script>
  import { page } from '$app/stores';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { randomizeWeek } from '$lib/meal';
  import { getMeals, getWeekPlan } from '$lib/firestoreCache';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import dayjs from 'dayjs';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { goto } from '$app/navigation';

  let week = $page.params.week;
  $: time = $page.params.time;
  $: user = $authStore.user;

  const days = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];
  $: weekPlan = {};
  let weekPlanRef = doc(db, 'weekPlans', week);
  $: weekPlanRef = doc(db, 'weekPlans', week);

  $: getWeekPlan(week).subscribe({
    next: (result = []) => {
      weekPlan = result;
    },
    error: (error) => {
      console.log('🛎 ', 'error', error);
    }
  });

  const onPrevClick = () => {
    week--;
  };

  const onNextClick = () => {
    week++;
  };

  const onRandomizeClick = () => {
    const meals = getMeals();
    const newWeek = randomizeWeek(meals);
    setDoc(
      weekPlanRef,
      newWeek.reduce((result, meal, dayIndex) => {
        return {
          ...result,
          [`d${dayIndex}`]: {
            [time]: {
              id: meal.id,
              name: meal.name
            }
          }
        };
      }, {})
    );
  };
</script>

<AppBar>
  <div class="flex justify-center items-center w-full text-white">
    <!-- <Button on:click={onPrevClick} icon="chevron_left" text color="white" />
    {dayjs(week).format("DD.MM.")}
    <Button on:click={onNextClick} icon="chevron_right" text color="white" /> -->
  </div>
</AppBar>
<Content>
  <div class="w-full">
    <div class="tabs max-w-sm pb-4 mx-auto">
      <a
        class="text-base tab tab-bordered flex-grow {time === 'lunch' &&
          'tab-active'}"
        href={`/week/${week}/lunch`}>Comida</a
      >
      <a
        class="text-base tab tab-bordered flex-grow {time === 'dinner' &&
          'tab-active'}"
        href={`/week/${week}/dinner`}>Cena</a
      >
    </div>
    {#each days as day, i}
      <div class="max-w-sm mx-auto flex items-center py-2">
        <div>
          {day}
        </div>
        <div class="text-right w-full flex justify-end items-center h-12">
          {#if user}
            {#if weekPlan[`d${i}`]?.[time]}
              <a class="link link-hover " href={`/week/${week}/${time}/${i}`}>
                {[weekPlan[`d${i}`][time].icon, weekPlan[`d${i}`][time].name]
                  .filter(Boolean)
                  .join(' ')}
              </a>
            {:else}
              <button class="btn" on:click={goto(`/week/${week}/${time}/${i}`)}
                >Elegir</button
              >
            {/if}
          {:else}
            <div
              class="w-44 h-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
            />
          {/if}
        </div>
      </div>
    {/each}
  </div>
</Content>
