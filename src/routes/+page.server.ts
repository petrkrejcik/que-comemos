import type { PageServerLoad } from './$types';
import getWeekPlanServer from '$lib/weekPlan/getWeekPlan.server';
import { dehydrate } from '@sveltestack/svelte-query';
import { getWeekId } from '$lib/date';

export const load: PageServerLoad = async ({ locals, params }) => {
	console.log('🛎 ', 'page.server.ts /');
	if (locals.user?.groupId) {
		await getWeekPlanServer(getWeekId(), locals.user.groupId, locals.queryClient);
	}
	const queryClientState = dehydrate(locals.queryClient);
	return { queryClientState };
};
