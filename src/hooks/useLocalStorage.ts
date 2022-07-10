import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import updateLocalStorage, { parseJSON } from '../utils/localStorage';

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
      const newValue = value instanceof Function ? value(store) : value;
      const hasStoreUpdated = updateLocalStorage(key, newValue);

      if (hasStoreUpdated) {
        setStore(newValue);
      }
    },
    [store]
  );

  return [store, setStoreValue];
}
