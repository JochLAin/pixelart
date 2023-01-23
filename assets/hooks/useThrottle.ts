import { useCallback, useRef } from "react";

type ThrottleCallback<T extends any[] = any[], R = number> = (...args: T) => R;
type ThrottleCaller<R = void> = (callback: ThrottleCallback<any[], any>) => number;

export default function useThrottle<T extends any[] = any[]>(callback: ThrottleCallback<T, void>, limit?: number): ThrottleCallback<T>;
export default function useThrottle<T extends any[] = any[]>(limit?: number): ThrottleCaller<number>;
export default function useThrottle<T extends any[] = any[]>(callback?: ThrottleCallback<T, void>|number, limit: number = 150): ThrottleCallback<T>|ThrottleCaller {
  const refThrottle = useRef<number|undefined>(undefined);
  if (typeof callback === 'number') {
    limit = callback;
    callback = undefined;
  }

  if (!callback) {
    return useCallback<ThrottleCaller<number>>((callback) => {
      if (!refThrottle.current) {
        callback();

        refThrottle.current = window.setTimeout(() => {
          refThrottle.current = undefined;
        }, limit);
      }
      return refThrottle.current;
    }, [refThrottle]);
  }

  return useCallback<ThrottleCallback<T, number>>((...args: T) => {
    if (!refThrottle.current) {
      if (typeof callback !== 'number') {
        callback?.(...args);
      }
      refThrottle.current = window.setTimeout(() => {
        refThrottle.current = undefined;
      }, limit);
    }

    return refThrottle.current;
  }, [refThrottle]);
}
