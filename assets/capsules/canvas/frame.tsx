import classNames from "classnames";
import { HTMLProps, forwardRef, useRef } from "react";
import useStore, { Frame } from "../../contexts/store";
import { useCanvas2D, useCanvasDimensions, useForwardedRef } from "../../hooks";

type CanvasFrameProps = HTMLProps<HTMLCanvasElement> & {
  frame: Frame,
};

export default forwardRef<HTMLCanvasElement, CanvasFrameProps>(function CanvasFrame(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const { frame, ...rest } = props;
  const store = useStore();

  const pixelSize = useCanvasDimensions(ref, store.clipWidth, store.clipHeight);
  useCanvas2D(ref, (context) => {
    for (let layerIdx = 0; layerIdx < frame.length; layerIdx++) {
      for (let pixelIdx = 0; pixelIdx < frame[layerIdx].length; pixelIdx++) {
        const color = frame[layerIdx][pixelIdx];
        if (!color) continue;
        const y = Math.floor(pixelIdx / store.clipHeight) * pixelSize;
        const x = (pixelIdx % store.clipWidth) * pixelSize;
        context.fillStyle = color;
        context.fillRect(x, y, pixelSize, pixelSize);
      }
    }
  }, [frame, pixelSize]);

  const className = classNames(
    'frame--canvas',
    props.className,
  );

  return <canvas
    ref={ref}
    {...rest}
    className={className}
  />;
});
