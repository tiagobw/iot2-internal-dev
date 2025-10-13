import { useEffect, useRef } from 'react';

export const useInterval = (
  callback: () => void,
  delay: number | null,
  isActive: boolean = true,
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if ((!delay && delay !== 0) || !isActive) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, isActive]);
};
