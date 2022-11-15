import { query, where, orderBy, collection, doc } from 'firebase/firestore';
import { queryCollection } from '$lib/firestore/collection';
import { queryDoc } from '$lib/firestore/document';
import getFirestore from '$lib/firebase/getFirestore';

export const getMeals = (groupId?: string, filter: { time?: string; forChild?: boolean } = {}) => {
	const mealsQuery = query(
		collection(getFirestore(), `groups/${groupId || 'noop'}/meals`),
		...[
			where('eatFor', '==', filter.time || 'lunch'),
			filter.forChild && where('forChild', '==', true),
			orderBy('name')
		].filter(Boolean)
	);
	return queryCollection(['meals', { filter, groupId }], mealsQuery, {
		enabled: !!groupId
	});
};

export const getMeal = (id: string, groupId?: string) => {
	const mealQuery = doc(getFirestore(), `groups/${groupId || 'noop'}/meals`, id);
	return queryDoc(['meal', { id, groupId }], mealQuery, { enabled: !!groupId });
};
