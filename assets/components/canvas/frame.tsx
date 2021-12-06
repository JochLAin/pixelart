import { HTMLProps, forwardRef, memo } from "react";
import { useDraw, useForwardedRef, useResize } from "../../hooks";
import { Frame, ForwardedRef } from "../../types";

type CanvasFrameProps = HTMLProps<HTMLCanvasElement> & {
    active?: boolean,
    frame: Frame,
    height: number,
    width: number
};

function CanvasFrame(
    { active, frame, height, width, ...props }: CanvasFrameProps,
    forwardedRef: ForwardedRef<HTMLCanvasElement>
) {
    const [ref, legacyRef] = useForwardedRef(forwardedRef);
    useResize(ref);
    useDraw(ref, (context, pixel_width, pixel_height) => {
        for (let index = 0; index < frame.length; index++) {
            for (let idx = 0; idx < frame[index].length; idx++) {
                const color = frame[index][idx];
                if (!color) continue;
                const y = Math.floor(idx / height) * pixel_height;
                const x = (idx % width) * pixel_width;
                context.fillStyle = color;
                context.fillRect(x, y, pixel_width, pixel_height);
            }
        }
    }, [frame]);

    let className = `pixelart-canvas ${props.className || ''}`.trim();
    if (active) className = `${className} active`.trim();

    return <canvas
        ref={legacyRef}
        {...props}
        className={className}
    />;
}

export default memo(forwardRef<HTMLCanvasElement, CanvasFrameProps>(CanvasFrame));
