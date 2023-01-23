import { MutableRefObject, RefObject, useEffect } from "react";

type CallbackType = (context: CanvasRenderingContext2D) => void;

export default function useCanvas2D<T>(ref: MutableRefObject<HTMLCanvasElement>|RefObject<HTMLCanvasElement>, callback?: CallbackType, dependencies: any[] = []) {
  useEffect(() => {
    const canvas = typeof ref !== 'function' ? ref?.current : null;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const { height, width } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);

    if (callback) {
      callback(context);
    }
  }, [ref, callback, ...dependencies]);
}
