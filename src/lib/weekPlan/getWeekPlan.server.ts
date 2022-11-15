import { getDoc } from 'firebase/firestore';
import type { WeekPlan } from '$lib/weekPlan/weekPlanType';
import getWeekPlanDocRef from '$lib/weekPlan/getWeekPlanDocRef';
import type { QueryClient } from '@sveltestack/svelte-query';

export default async (weekId: string, groupId: string, queryClient: QueryClient) => {
	let weekPlan = null;
	const snapshot = await getDoc(getWeekPlanDocRef(weekId, groupId));
	if (snapshot.exists()) {
		weekPlan = { ...snapshot.data(), id: snapshot.id } as WeekPlan;
	}
	queryClient.setQueryData(['weekPlan', { weekId, groupId }], weekPlan);
};
