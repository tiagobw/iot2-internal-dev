
import { useSpinDelay } from 'spin-delay';

export function useIsLoading(loading: boolean) {
  return useSpinDelay(loading, { delay: 0, minDuration: 2000 });
}