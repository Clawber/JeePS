import { writable } from 'svelte/store';

export let global_isloggedin = writable(false);
export let global_username = writable('LOGIN');

