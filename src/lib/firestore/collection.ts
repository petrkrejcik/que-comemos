import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
import type { QueryKey, UseQueryOptions } from '@sveltestack/svelte-query';
import { onSnapshot, Query } from 'firebase/firestore';

export const queryCollection = (key: QueryKey, query: Query, options: UseQueryOptions = {}) => {
	const queryClient = useQueryClient();
	const defaultOptions: UseQueryOptions = {
		staleTime: Infinity,
		cacheTime: Infinity,
		...options
	};
	return useQuery(
		key,
		() => {
			return new Promise((resolve, reject) => {
				const unsubscribe = onSnapshot(
					query,
					(snapshot) => {
						let result = [];
						snapshot.forEach((doc) => {
							result.push({ ...doc.data(), id: doc.id });
						});
						queryClient.setQueryData(key, result);
						resolve(result);
						result.forEach((item) =>
							// Cache every item by it's id
							queryClient.setQueryData([key[0], { id: item.id }], item)
						);
					},
					reject
				);
			});
		},
		defaultOptions
	);
};
