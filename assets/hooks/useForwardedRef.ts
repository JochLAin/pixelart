import { MutableRefObject, RefObject, useEffect, useRef } from "react";

export default function useForwardedRef<T>(forwardedRef: MutableRefObject<T|null>|((current: T) => void)|null): RefObject<T> {
  const ref = (!forwardedRef || typeof forwardedRef === 'function') ? useRef<T>(null) : forwardedRef;

  useEffect(() => {
    if (typeof forwardedRef === 'function' && ref?.current) {
      forwardedRef(ref.current);
    }
  }, []);

  return ref;
}
