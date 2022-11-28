import { useEffect, useState } from "react";

/** In app.tsx we defined what the values local storage is gonna take ;
 * T is the generic or the defined types ,
 * key which is teh string value used as "book or tags in app.tsx"
 * when you use use state you can either return a inital value or a function that returns a genericc type ie, T
 */
export function useLocalStorage<T>(key: string, initialvalue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialvalue === "function") {
        return (initialvalue as () => T)();
      } else return initialvalue;
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return [value, setValue] as [T, typeof setValue];
}
