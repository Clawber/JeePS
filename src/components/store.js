import { writable } from 'svelte/store';

export let global_isloggedin = writable(false);
export let global_username = writable('LOGIN');
export let activeOperation = writable('list');
export let activeTable = writable('jeepneys');
