import {HTMLProps, forwardRef, memo, MutableRefObject} from "react";
import { useDraw, useForwardedRef, useResize } from "../../hooks";
import { ForwardedRef } from "../../types";

type CanvasEditorProps = HTMLProps<HTMLCanvasElement> & {
    height: number,
    width: number
};

function CanvasEditor(
    { height, width, ...props }: CanvasEditorProps,
    forwardedRef: ForwardedRef<HTMLCanvasElement>
) {
    const [ref, legacyRef] = useForwardedRef(forwardedRef);
    useResize(ref);
    useDraw(ref, (context, pixel_width, pixel_height) => {

    });

    return <canvas
        ref={legacyRef as MutableRefObject<HTMLCanvasElement>}
        {...props}
        className="pixelart-canvas"
    />;
}

export default memo(forwardRef<HTMLCanvasElement, CanvasEditorProps>(CanvasEditor));
