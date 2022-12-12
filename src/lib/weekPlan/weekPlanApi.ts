import { queryDoc } from '../firestore/document';
import type { UseQueryOptions } from '@sveltestack/svelte-query';
import type { WeekPlan } from '$lib/weekPlan/weekPlanType';
import getFirestore from '$lib/firebase/getFirestore';
import { doc } from 'firebase/firestore';

export const getWeekPlan = (
	weekId: string,
	groupId: string,
	queryOptions?: UseQueryOptions<WeekPlan>
) => {
	return queryDoc<WeekPlan>(
		['weekPlan', { weekId, groupId }],
		doc(getFirestore(), `groups/${groupId}/weekPlans`, weekId),
		{
			enabled: !!groupId,
			...queryOptions
		}
	);
};
