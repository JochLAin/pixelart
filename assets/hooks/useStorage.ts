import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useStorage<T = any>(save: (value?: T) => void, retrieve: () => T|undefined, initialValue?: T, eventNames: string[] = []): [T|undefined, Dispatch<SetStateAction<T|undefined>>] {
  const readValue = (): T|undefined => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      return retrieve();
    } catch (error: any) {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T|undefined>(readValue());

  const setValue = (value: T|undefined|((value?: T) => T|undefined)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    save(valueToStore);
  };

  useEffect(() => {
    const handleStorageChange = () => setStoredValue(readValue());
    for (let idx = 0; idx < eventNames.length; idx++) {
      window.addEventListener(eventNames[idx], handleStorageChange);
    }
    handleStorageChange();

    return () => {
      for (let idx = 0; idx < eventNames.length; idx++) {
        window.removeEventListener(eventNames[idx], handleStorageChange);
      }
    };
  }, []);

  return [storedValue, setValue];
}

export function useLocalStorage<T = any>(key: string, initialValue?: T): [T|undefined, Dispatch<SetStateAction<T|undefined>>] {
  const save = (value?: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const retrieve = () => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };

  return useStorage<T>(save, retrieve, initialValue, ['storage', 'local-storage']);
}

export function useSessionStorage<T = any>(key: string, initialValue: T): [T|undefined, Dispatch<SetStateAction<T|undefined>>] {
  const save = (value?: T) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  const retrieve = () => {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };

  return useStorage<T>(save, retrieve, initialValue, ['storage', 'session-storage']);
}
