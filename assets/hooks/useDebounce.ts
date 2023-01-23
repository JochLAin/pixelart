import { useCallback, useRef } from "react";

type DebounceCallback<T extends any[] = any[], R = number> = (...args: T) => R;
type DebounceCaller<R = void> = (callback: DebounceCallback<any[], any>) => R;

export default function useDebounce<T extends any[] = any[]>(callback: DebounceCallback<T, void>, delay?: number): DebounceCallback<T>;
export default function useDebounce<T extends any[] = any[]>(delay?: number): DebounceCaller<number>;
export default function useDebounce<T extends any[] = any[]>(callback?: DebounceCallback<T, void>|number, delay: number = 150): DebounceCallback<T>|DebounceCaller {
  const refTimeoutId = useRef<number|undefined>();
  if (typeof callback === 'number') {
    delay = callback;
    callback = undefined;
  }

  if (!callback) {
    return useCallback<DebounceCaller<number>>((callback) => {
      if (refTimeoutId.current) window.clearTimeout(refTimeoutId.current);
      return refTimeoutId.current = window.setTimeout(() => {
        refTimeoutId.current = undefined;
        callback();
      }, delay);
    }, [refTimeoutId.current]);
  }

  return useCallback<DebounceCallback<T, number>>((...args: T) => {
    if (refTimeoutId.current) window.clearTimeout(refTimeoutId.current);
    return refTimeoutId.current = window.setTimeout(() => {
      refTimeoutId.current = undefined;
      if (typeof callback !== 'number') {
        callback?.(...args);
      }
    }, delay);
  }, [refTimeoutId.current]);
}
