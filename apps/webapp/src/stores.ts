import { writable, type Writable } from "svelte/store";

export const updateRouter = writable(true);
export const currentRoute: Writable<any> = writable(undefined);
