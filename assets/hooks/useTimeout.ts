import { useEffect } from "react";

export default function useTimeout(callback: () => void, delay: number = 100, dependencies: any[] = []) {
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => {
      clearTimeout(timeout);
    }
  }, dependencies);
};
