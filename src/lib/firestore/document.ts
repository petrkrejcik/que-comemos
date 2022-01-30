import { QueryKey, useQuery, UseQueryOptions } from '@sveltestack/svelte-query';
import { useQueryClient } from '@sveltestack/svelte-query';
import {
  DocumentData,
  DocumentReference,
  getDocs,
  onSnapshot,
  Query
} from 'firebase/firestore';

export const queryDoc = (
  key: QueryKey,
  query: DocumentReference<DocumentData>,
  options: UseQueryOptions = {}
) => {
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
          (doc) => {
            if (!doc.exists) return reject('Firebase document not found.');
            const result = { ...doc.data(), id: doc.id };
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
