import { useState } from "react";

export const useLocalStorage = <T,>(
  keyName: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(keyName);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.log(err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      const valueToStore = JSON.stringify(newValue);
      window.localStorage.setItem(keyName, valueToStore);
      setStoredValue(newValue);
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue];
};
