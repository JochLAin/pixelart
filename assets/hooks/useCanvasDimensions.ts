import {MutableRefObject, RefObject, useEffect, useState} from "react";
import * as utils from "../utils";

export default function useCanvasDimensions(ref: MutableRefObject<HTMLCanvasElement>|RefObject<HTMLCanvasElement>, spriteWidth: number, spriteHeight: number): number {
  const [pixelSize, setPixelSize] = useState<number>(10);

  useEffect(() => {
    const onResize = () => {
      const canvas = typeof ref !== 'function' ? ref?.current : null;
      if (!canvas) return;

      const [parentWidth, parentHeight] = utils.getElementDimensions(canvas.parentElement as HTMLElement);
      const pixelSize = utils.getPixelDimensions(spriteWidth, spriteHeight, parentWidth, parentHeight);

      canvas.setAttribute('height', String(Math.floor(spriteHeight * pixelSize)));
      canvas.setAttribute('width', String(Math.floor(spriteWidth * pixelSize)));
      canvas.style.removeProperty('height');
      canvas.style.removeProperty('width');

      setPixelSize(pixelSize);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [ref, spriteWidth, spriteHeight]);

  return pixelSize;
}
