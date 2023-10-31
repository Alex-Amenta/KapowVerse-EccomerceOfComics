import { useEffect, useState } from "react";

export function useDebounce (value, delay = 350) {
    const [debouncedValue, setDebouncedValue] = useState("");
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => clearTimeout(timeoutId);
    }, [value, delay]);
    return debouncedValue;
  }