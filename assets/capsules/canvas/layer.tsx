import { HTMLProps, forwardRef } from "react";
import useStore, { Layer } from "../../contexts/store";
import { useCanvas2D, useCanvasDimensions, useForwardedRef } from "../../hooks";
import * as utils from "../../utils";

type CanvasLayerProps = HTMLProps<HTMLCanvasElement> & {
  layer: Layer,
};

export default forwardRef<HTMLCanvasElement, CanvasLayerProps>(function CanvasLayer(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const store = useStore();
  const { layer, ...rest } = props;

  const pixelSize = useCanvasDimensions(ref, store.spriteWidth, store.spriteHeight);
  useCanvas2D(ref, (context) => {
    utils.drawLayer(context, layer, store.spriteWidth, store.spriteHeight, pixelSize);
  }, [layer, pixelSize]);

  return <canvas
    ref={ref}
    {...rest}
  />;
});
