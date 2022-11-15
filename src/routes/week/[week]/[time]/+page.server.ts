import type { PageServerLoad } from './$types';
import getWeekPlanServer from '$lib/weekPlan/getWeekPlan.server';
import { dehydrate } from '@sveltestack/svelte-query';

export const load: PageServerLoad = async ({ locals, params }) => {
	console.log('🛎 ', 'page.server.ts [time]');
	if (locals.user?.groupId) {
		await getWeekPlanServer(params.week, locals.user.groupId, locals.queryClient);
	}
	console.log('🛎 ', 'page.server.ts [time]; dehydrate');
	const queryClientState = dehydrate(locals.queryClient);
	return { queryClientState };
};
