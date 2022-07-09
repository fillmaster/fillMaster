import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type SetLocalStorage<T> = Dispatch<SetStateAction<T>>;

export default function useLocalStorage<T>(key: string, initialValue: T): [T, SetLocalStorage<T>] {
  const readStore = useCallback(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const value = window.localStorage.getItem(key);

      return value ? (parseJSON(value) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [store, setStore] = useState(readStore);

  const setStoreValue: SetLocalStorage<T> = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        return;
      }

      try {
        const newValue = value instanceof Function ? value(store) : value;

        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStore(newValue);
      } catch (error) {
        console.error(`Error setting store with key ${key}`, error);
      }
    },
    [store]
  );

  return [store, setStoreValue];
}

const parseJSON = <T>(json: string | null): T | undefined => {
  try {
    return json === 'undefined' ? undefined : JSON.parse(json ?? '');
  } catch {
    return undefined;
  }
};
