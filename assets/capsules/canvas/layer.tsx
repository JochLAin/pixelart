import classNames from "classnames";
import { HTMLProps, forwardRef } from "react";
import useStore, { Layer } from "../../contexts/store";
import { useCanvas2D, useCanvasDimensions, useForwardedRef } from "../../hooks";

type CanvasLayerProps = HTMLProps<HTMLCanvasElement> & {
  layer: Layer,
};

export default forwardRef<HTMLCanvasElement, CanvasLayerProps>(function CanvasLayer(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const store = useStore();
  const { layer, ...rest } = props;

  const pixelSize = useCanvasDimensions(ref, store.clipWidth, store.clipHeight);
  useCanvas2D(ref, (context) => {
    for (let pixelIdx = 0; pixelIdx < layer.length; pixelIdx++) {
      const color = layer[pixelIdx];
      if (!color) continue;
      const y = Math.floor(pixelIdx / store.clipHeight) * pixelSize;
      const x = (pixelIdx % store.clipWidth) * pixelSize;
      context.fillStyle = color;
      context.fillRect(x, y, pixelSize, pixelSize);
    }
  }, [layer, pixelSize]);

  const className = classNames(
    'layer--canvas',
    props.className,
  );

  return <canvas
    ref={ref}
    {...rest}
    className={className}
  />;
});
