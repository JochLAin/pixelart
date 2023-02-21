import { HTMLProps, forwardRef, useRef } from "react";
import useStore, { Frame } from "../../contexts/store";
import { useCanvas2D, useCanvasDimensions, useForwardedRef } from "../../hooks";
import * as utils from "../../utils";

type CanvasFrameProps = HTMLProps<HTMLCanvasElement> & {
  frame: Frame,
};

export default forwardRef<HTMLCanvasElement, CanvasFrameProps>(function CanvasFrame(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const { frame, ...rest } = props;
  const store = useStore();

  const pixelSize = useCanvasDimensions(ref, store.spriteWidth, store.spriteHeight);
  useCanvas2D(ref, (context) => {
    utils.drawFrame(context, frame, store.spriteWidth, store.spriteHeight, pixelSize);
  }, [frame, pixelSize]);

  return <canvas
    ref={ref}
    {...rest}
  />;
});
