import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async function load({ locals }) {
	return {
		user: locals.user
	};
};
