import { db } from '$lib/firebase';
import { query, where, orderBy, collection, doc } from 'firebase/firestore';
import { queryCollection } from '../firestore/collection';
import { queryDoc } from '../firestore/document';

export const getMeals = (
  filter: { time?: string; forChild?: boolean } = {}
) => {
  const mealsQuery = query(
    collection(db, 'meals'),
    ...[
      where('eatFor', '==', filter.time || 'lunch'),
      filter.forChild && where('forChild', '==', true),
      orderBy('name')
    ].filter(Boolean)
  );
  return queryCollection(['meals', filter], mealsQuery);
};

export const getMeal = (id: string) => {
  const mealQuery = doc(db, 'meals', id);
  return queryDoc(['meal', { id }], mealQuery);
};
