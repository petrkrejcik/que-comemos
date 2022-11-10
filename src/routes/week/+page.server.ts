import type { PageServerLoad } from './$types';
import { getWeekId } from '$lib/date';
import getWeekPlanServer from '$lib/weekPlan/getWeekPlan.server';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('🛎 ', 'page.server.ts /week');
	if (locals.user?.groupId) {
		await getWeekPlanServer(getWeekId(), locals.user.groupId, locals.queryClient);
	}
};
