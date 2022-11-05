import type { QueryKey, UseQueryOptions } from '@sveltestack/svelte-query';
import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
import { DocumentReference, onSnapshot, type DocumentData } from 'firebase/firestore';

export const queryDoc = <T = unknown>(
	key: QueryKey,
	query: DocumentReference<DocumentData>,
	options: UseQueryOptions<T> = {}
) => {
	const queryClient = useQueryClient();
	const defaultOptions: UseQueryOptions<T> = {
		staleTime: Infinity,
		cacheTime: Infinity,
		...options
	};
	return useQuery<T>(
		key,
		() => {
			return new Promise<T>((resolve, reject) => {
				const unsubscribe = onSnapshot(
					query,
					(doc) => {
						if (!doc.exists) return reject('Firebase document not found.');
						const result = { ...doc.data(), id: doc.id } as T;
						if (!result) return;
						queryClient.setQueryData(key, result);
						resolve(result);
					},
					reject
				);
			});
		},
		defaultOptions
	);
};
