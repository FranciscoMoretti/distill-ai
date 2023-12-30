import { useEffect, useState } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T | undefined {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? (JSON.parse(saved) as T) : defaultValue;
    return initial;
  }
}

const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  // eslint-disable-next-line no-unused-vars
): [T | undefined, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    return getStorageValue<T>(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
