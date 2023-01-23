import { useEffect } from "react";

export default function useInterval(callback: () => void, delay: number = 100, dependencies: any[] = []) {
  useEffect(() => {
    const interval = setInterval(callback, delay);
    return () => {
      clearInterval(interval);
    }
  }, dependencies);
};
