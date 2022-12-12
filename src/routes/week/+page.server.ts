import type { PageServerLoad } from './$types';
import { getWeekId } from '$lib/date';
import getWeekPlanServer from '$lib/weekPlan/getWeekPlan.server';
import { dehydrate } from '@sveltestack/svelte-query';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user?.groupId) {
		await getWeekPlanServer(getWeekId(), locals.user.groupId, locals.queryClient);
	}
	const queryClientState = dehydrate(locals.queryClient);
	return { queryClientState };
};
