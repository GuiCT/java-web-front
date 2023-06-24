import { writable } from 'svelte/store';
const isBrowser = typeof window !== 'undefined';

const { subscribe, set } = writable('');
isBrowser && localStorage.jwt && set(localStorage.jwt);

export const jwtStore = {
	subscribe,
	set: (jwt: string) => {
		isBrowser && (localStorage.jwt = jwt);
		set(jwt);
	}
};
