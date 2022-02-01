<script>
  import { joinMeals, randomizeWeek } from '$lib/meal';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { getWeekPlan } from '$lib/weekPlan/weekPlanApi';
  import { goto } from '$app/navigation';
  import { decrementWeek, getWeekRelative, incrementWeek } from '$lib/date';
  import dayjs from 'dayjs';

  export let week;
  export let time;
  export let user;

  const days = [];
  const firstDay = dayjs().startOf('week');
  for (let i = 0; i < 7; i++) {
    days.push(dayjs(firstDay).add(i, 'day'));
  }

  $: weekPlan = getWeekPlan(week);

  // const onRandomizeClick = () => {
  //   const meals = getMeals();
  //   const newWeek = randomizeWeek(meals);
  //   setDoc(
  //     doc(db, 'weekPlans', week),
  //     newWeek.reduce((result, meal, dayIndex) => {
  //       return {
  //         ...result,
  //         [`d${dayIndex}`]: {
  //           [time]: {
  //             id: meal.id,
  //             name: meal.name
  //           }
  //         }
  //       };
  //     }, {})
  //   );
  // };
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
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <button class="btn btn-square btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>
      <ul
        tabindex="0"
        class="shadow menu dropdown-content bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="/meals">Lista de comidas</a>
        </li>
      </ul>
    </div>
  </div>
</AppBar>

<Content>
  <div class="w-full">
    <div class="tabs max-w-sm mb-4 mx-auto">
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
    <ul class="divide-y divide-zinc-800">
      {#each days as day, i}
        <div class="max-w-sm mx-auto flex items-center py-2">
          <div class="avatar placeholder mr-10">
            <div
              class={`bg-neutral text-gray-400 rounded-full w-12 h-12 ${
                day.isSame(dayjs(), 'day') && 'border-2 border-lime-500'
              } `}
            >
              <span>{day.format('dd')}</span>
            </div>
          </div>
          <div class="w-full flex items-center h-12">
            {#if user}
              {#if $weekPlan.data?.[`d${i}`]?.[time]}
                <a class="link link-hover " href={`/week/${week}/${time}/${i}`}>
                  {joinMeals([
                    $weekPlan.data?.[`d${i}`][time],
                    $weekPlan.data?.[`d${i}`][`${time}-side-dish`]
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
    </ul>
  </div>
</Content>
