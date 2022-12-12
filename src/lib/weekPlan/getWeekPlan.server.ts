import { getFirestore } from 'firebase-admin/firestore';
import type { WeekPlan } from '$lib/weekPlan/weekPlanType';
import type { QueryClient } from '@sveltestack/svelte-query';
import { getFirebaseAdmin } from '$lib/firebase/getFirebaseAdmin.server';

export default async (weekId: string, groupId: string, queryClient: QueryClient) => {
	let weekPlan = null;
	const snapshot = await getFirestore(getFirebaseAdmin()).doc(`groups/${groupId}/weekPlans/${weekId}`).get();
	if (snapshot.exists) {
		weekPlan = { ...snapshot.data(), id: snapshot.id } as WeekPlan;
	}
	queryClient.setQueryData(['weekPlan', { weekId, groupId }], weekPlan);
};
