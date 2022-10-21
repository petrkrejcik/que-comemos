import { useQuery } from '@sveltestack/svelte-query';
import type { QueryKey, UseQueryOptions } from '@sveltestack/svelte-query';
import { useQueryClient } from '@sveltestack/svelte-query';
import {
  DocumentReference,
  getDocs,
  onSnapshot,
  Query
} from 'firebase/firestore';
import type {
  DocumentData,
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
