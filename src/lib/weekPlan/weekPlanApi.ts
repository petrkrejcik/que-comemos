import { queryDoc } from '../firestore/document';
import type { UseQueryOptions } from '@sveltestack/svelte-query';
import type { WeekPlan } from '$lib/weekPlan/weekPlanType';
import getWeekPlanDoc from '$lib/weekPlan/getWeekPlanDocRef';

export const getWeekPlan = (
	weekId: string,
	groupId: string,
	queryOptions?: UseQueryOptions<WeekPlan>
) => {
	return queryDoc<WeekPlan>(['weekPlan', { weekId, groupId }], getWeekPlanDoc(weekId, groupId), {
		enabled: !!groupId,
		...queryOptions
	});
};
