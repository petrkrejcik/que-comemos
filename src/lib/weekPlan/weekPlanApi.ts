import { db } from '$lib/firebase';
import { doc } from 'firebase/firestore';
import { queryDoc } from '../firestore/document';

export const getWeekPlan = (weekId: string, groupId?: string) => {
  const query = doc(db, `groups/${groupId || 'noop'}/weekPlans`, weekId);
  return queryDoc(['weekPlan', { weekId, groupId }], query, {
    enabled: !!groupId,
  });
};
