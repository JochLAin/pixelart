import { HTMLProps, forwardRef, memo } from "react";
import { useDraw, useForwardedRef, useResize } from "../../hooks";
import { Layer, ForwardedRef } from "../../types";

type CanvasLayerProps = HTMLProps<HTMLCanvasElement> & {
    active?: boolean,
    layer: Layer,
    height: number,
    width: number
};

function CanvasLayer(
    { active, layer, height, width, ...props }: CanvasLayerProps,
    forwardedRef: ForwardedRef<HTMLCanvasElement>
) {
    const [ref, legacyRef] = useForwardedRef(forwardedRef);
    useResize(ref);
    useDraw(ref, (context, pixel_width, pixel_height) => {
        for (let idx = 0; idx < layer.length; idx++) {
            const color = layer[idx];
            if (!color) continue;
            const y = Math.floor(idx / height) * pixel_height;
            const x = (idx % width) * pixel_width;
            context.fillStyle = color;
            context.fillRect(x, y, pixel_width, pixel_height);
        }
    }, [layer]);

    let className = `pixelart-canvas ${props.className || ''}`.trim();
    if (active) className = `${className} active`.trim();

    return <canvas
        ref={legacyRef}
        {...props}
        className={className}
    />;
}

export default memo(forwardRef<HTMLCanvasElement, CanvasLayerProps>(CanvasLayer));
