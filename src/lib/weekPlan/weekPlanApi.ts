import { db } from '$lib/firebase';
import { doc } from 'firebase/firestore';
import { queryDoc } from '../firestore/document';

export const getWeekPlan = (weekId: string) => {
  const query = doc(db, 'groups/mojeI6fi9GdeWywMEn9Yr/weekPlans', weekId);
  return queryDoc(['weekPlan', { weekId }], query);
};
