import { writable, derived } from "svelte/store";

// Persistent local storage store for JWT.
const createPersistentStore = (key, startValue) => {
  const { subscribe, set, update } = writable(startValue);

  return {
    subscribe,
    set,
    update,
    get: () => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value
        }
      }
    },
    useLocalStorage: () => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          set(JSON.parse(value));
        } catch (e) {
          console.log('Failed parsing JSON stores.')
          set(value)
        }
      }

      subscribe(current => {
        try {
          localStorage.setItem(key, JSON.stringify(current));
        }
        catch (err) {
          console.log(err)
          localStorage.setItem(key, current);
        }
      });
    }
  };
};

// Export stores
export const jwtStore = createPersistentStore("jwtStore", "");
export const username = createPersistentStore("username", "");
export const segment = createPersistentStore("segment", "");
export const isSignedIn = derived(jwtStore, $jwtStore => {
  return $jwtStore !== "";
});