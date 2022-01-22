<script>
  import { page } from '$app/stores';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { joinMeals, randomizeWeek } from '$lib/meal';
  import { getMeals, getWeekPlan } from '$lib/firestoreCache';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import dayjs from 'dayjs';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { goto } from '$app/navigation';
  import { decrementWeek, getWeekRelative, incrementWeek } from '$lib/date';

  $: week = $page.params.week;
  $: time = $page.params.time;
  $: user = $authStore?.user;

  const days = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  $: weekPlan = {};
  $: weekPlanRef = doc(db, 'weekPlans', week);

  $: getWeekPlan(week).subscribe({
    next: (result = []) => {
      weekPlan = result;
    },
    error: (error) => {
      console.log('🛎 ', 'error', error);
    }
  });

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
  <div class="flex text-center items-center text-white w-72 mx-auto">
    <a
      class="btn btn-circle text-xl"
      href={`/week/${decrementWeek(week)}/lunch`}>❮</a
    >
    <div class="text-lg grow">
      {getWeekRelative(week)}
    </div>
    <a
      class="btn btn-circle text-xl"
      href={`/week/${incrementWeek(week)}/lunch`}>❯</a
    >
  </div>
</AppBar>
<Content>
  <div class="w-full">
    <div class="tabs max-w-sm pb-4 mx-auto">
      <a
        class="text-base tab tab-bordered flex-grow uppercase {time ===
          'lunch' && 'tab-active'}"
        href={`/week/${week}/lunch`}>Comida</a
      >
      <a
        class="text-base tab tab-bordered flex-grow uppercase {time ===
          'dinner' && 'tab-active'}"
        href={`/week/${week}/dinner`}>Cena</a
      >
    </div>
    {#each days as day, i}
      <div class="max-w-sm mx-auto flex items-center py-2">
        <div class="avatar placeholder mr-10">
          <div class="bg-neutral text-gray-400 rounded-full w-12 h-12">
            <span>{day}</span>
          </div>
        </div>
        <!-- <div>
          {day}
        </div> -->
        <div class="w-full flex items-center h-12">
          {#if user}
            {#if weekPlan[`d${i}`]?.[time]}
              <a class="link link-hover " href={`/week/${week}/${time}/${i}`}>
                {joinMeals([
                  weekPlan[`d${i}`][time],
                  weekPlan[`d${i}`][`${time}-side-dish`]
                ])}
              </a>
            {:else}
              <button
                class="btn btn-ghost"
                on:click={goto(`/week/${week}/${time}/${i}`)}>Elegir</button
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
