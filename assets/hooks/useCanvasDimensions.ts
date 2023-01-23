import {MutableRefObject, RefObject, useEffect, useState} from "react";
import * as utils from "../utils";

export default function useCanvasDimensions(ref: MutableRefObject<HTMLCanvasElement>|RefObject<HTMLCanvasElement>, clipWidth: number, clipHeight: number): number {
  const [pixelSize, setPixelSize] = useState<number>(10);

  useEffect(() => {
    const onResize = () => {
      const canvas = typeof ref !== 'function' ? ref?.current : null;
      if (!canvas) return;

      const [parentWidth, parentHeight] = utils.getElementDimensions(canvas.parentElement as HTMLElement);
      const pixelSize = utils.getPixelDimensions(clipWidth, clipHeight, parentWidth, parentHeight);

      canvas.setAttribute('height', String(Math.floor(clipHeight * pixelSize)));
      canvas.setAttribute('width', String(Math.floor(clipWidth * pixelSize)));
      canvas.style.removeProperty('height');
      canvas.style.removeProperty('width');

      setPixelSize(pixelSize);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [ref, clipWidth, clipHeight]);

  return pixelSize;
}
