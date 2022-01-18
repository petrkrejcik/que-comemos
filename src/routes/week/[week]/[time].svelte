<script>
  import { page } from '$app/stores';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { randomizeWeek } from '$lib/meal';
  import { getWeekId } from '$lib/date';
  import { getMeals, getWeekPlan } from '$lib/firestoreCache';
  import AppBar from '$lib/AppBar.svelte';
  import Content from '$lib/Content.svelte';
  import dayjs from 'dayjs';
  import { firstValueFrom } from 'rxjs';
  import { authStore } from '$lib/auth/firebaseAuth';
  import { goto } from '$app/navigation';

  let week = $page.params.week;
  let time = $page.params.time;
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
  $: console.log('🛎 ', 'weekPlan', weekPlan);
  // let days = [];
  // let week = getWeekId(week);
  let weekPlanRef = doc(db, 'weekPlans', week);
  $: weekPlanRef = doc(db, 'weekPlans', week);
  const navigate = () => console.log('🛎 ', 'nav');
  // $: days = [
  //   {
  //     text: 'Lunes',
  //     onClick: () => navigate(`/day/${week}/d0/${time}`),
  //     food: weekPlan.d0?.[time]
  //   },
  //   {
  //     text: 'Martes',
  //     onClick: () => navigate(`/day/${week}/d1/${time}`),
  //     food: weekPlan.d1?.[time]
  //   },
  //   {
  //     text: 'Miércoles',
  //     onClick: () => navigate(`/day/${week}/d2/${time}`),
  //     food: weekPlan.d2?.[time]
  //   },
  //   {
  //     text: 'Jueves',
  //     onClick: () => navigate(`/day/${week}/d3/${time}`),
  //     food: weekPlan.d3?.[time]
  //   },
  //   {
  //     text: 'Viernes',
  //     onClick: () => navigate(`/day/${week}/d4/${time}`),
  //     food: weekPlan.d4?.[time]
  //   },
  //   {
  //     text: 'Sábado',
  //     onClick: () => navigate(`/day/${week}/d5/${time}`),
  //     food: weekPlan.d5?.[time]
  //   },
  //   {
  //     text: 'Domingo',
  //     onClick: () => navigate(`/day/${week}/d6/${time}`),
  //     food: weekPlan.d6?.[time]
  //   }
  // ];

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

<!-- <Tabs
  bind:selected={time}
  class="w-100 bg-primary-200"
  color="white"
  items={[
    { id: "lunch", text: "Comida" },
    { id: "dinner", text: "Cena" },
  ]}
/> -->
<Content>
  <div class="tabs w-full pb-4">
    <a class="tab tab-bordered flex-grow">Comida</a>
    <a class="tab tab-bordered flex-grow tab-active">Cena</a>
  </div>

  <table class="table-auto w-full">
    <tbody>
      {#each days as day, i}
        <tr class="w-full">
          <td>
            {day}
          </td>
          <td class="text-right w-full flex justify-end items-center h-12">
            {#if user}
              {#if weekPlan[`d${i}`]?.[time]}
                <a class="link link-hover " href={`/week/${week}/${time}/${i}`}>
                  {[weekPlan[`d${i}`][time].icon, weekPlan[`d${i}`][time].name]
                    .filter(Boolean)
                    .join(' ')}
                </a>
              {:else}
                <button
                  class="btn"
                  on:click={goto(`/week/${week}/${time}/${i}`)}>Select</button
                >
              {/if}
            {:else}
              <div
                class="w-24  bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
              />
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- <List items={days} dense navigation>
    <li slot="item" let:item>
      <div
        class="flex justify-center items-center cursor-pointer p-4 h-14"
        on:click={item.onClick}
      >
        <div class="w-1/2">
          {item.text}
        </div>
        <div class="w-1/2">
          {#if item.food}
            {item.food.icon || ''}
            {item.food.name}
          {:else}
            <Button outlined>Elegir</Button>
          {/if}
        </div>
      </div>
    </li>
  </List> -->

  <!-- <button on:click={onRandomizeClick}>🔄 Random</button> -->
</Content>
