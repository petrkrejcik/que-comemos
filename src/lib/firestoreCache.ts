import { query, where, orderBy, collection, doc } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { startWith } from 'rxjs';
import { writable } from 'svelte/store';
import { db } from '$lib/firebase';

const cache = writable({});

export const getMeals = (
  filter: { time?: string; forChild?: boolean } = {}
) => {
  if (cache.meals) {
    return cache.meals;
  }
  const mealsRef = collection(db, 'meals');
  const mealsQuery = query(
    mealsRef,
    ...[
      where('eatFor', '==', filter.time || 'lunch'),
      filter.forChild && where('forChild', '==', true),
      orderBy('name')
    ].filter(Boolean)
  );
  const meals = collectionData(mealsQuery, { idField: 'id' }).pipe(
    startWith([])
  );
  cache.update((store) => ({ ...store, meals }));
  return meals;
};

export const getWeekPlan = (weekId) => {
  const key = `weekPlan${weekId}`;
  if (cache[key]) {
    return cache[key];
  }
  let q = query(doc(db, 'weekPlans', weekId));
  cache.update((store) => ({ ...store, key: docData(q) }));
  return docData(q);
};
