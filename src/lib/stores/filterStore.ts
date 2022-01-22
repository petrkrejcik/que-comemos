import { writable } from 'svelte/store';

export const filterStore = writable<{
  forChild: boolean;
}>({
  forChild: true
});
