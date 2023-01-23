import classNames from "classnames";
import { colord } from "colord";
import { HTMLProps, MouseEvent, forwardRef, useRef } from "react";
import useEditor from "../../contexts/editor";
import useStore from "../../contexts/store";
import { useCanvas2D, useForwardedRef } from "../../hooks";
import * as utils from "../../utils";

type CanvasEditorProps = HTMLProps<HTMLCanvasElement> & {
};

export default forwardRef<HTMLCanvasElement, CanvasEditorProps>(function CanvasEditor(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const store = useStore();
  const editor = useEditor();
  const refPreviousX = useRef<number|null>(null);
  const refPreviousY = useRef<number|null>(null);

  useCanvas2D(ref, (context) => {
    const frame = store.clip[store.frameIdx];
    for (let layerIdx = 0, last = Math.min(store.layerIdx, frame.length - 1); layerIdx <= last; layerIdx++) {
      for (let pixelIdx = 0; pixelIdx < frame[layerIdx].length; pixelIdx++) {
        const color = frame[layerIdx][pixelIdx];
        if (!color) continue;
        const y = Math.floor(pixelIdx / store.clipHeight) * editor.pixelSize;
        const x = (pixelIdx % store.clipWidth) * editor.pixelSize;
        context.fillStyle = colord(color).alpha(layerIdx !== last ? 0.8 : 1).toHex();
        context.fillRect(x, y, editor.pixelSize, editor.pixelSize);
      }
    }
  }, [store.clip, editor.pixelSize]);

  function run(evt: MouseEvent<HTMLCanvasElement>, cx: number, cy: number, px: number, py: number) {
    const buttons = utils.getInputValue(evt);
    if (utils.isMouseButtonLeft(buttons) || utils.isMouseButtonRight(buttons)) {
      const pixels = utils.createLine(store.clipWidth, px, py, cx, cy);
      console.log(px, py, cx, cy, pixels);
      store.draw(pixels, store.getColor(buttons));
    }
  }

  const onContextMenu = (evt: MouseEvent<HTMLCanvasElement>) => {
    evt.preventDefault();
    props.onContextMenu?.(evt);
  };

  const onMouseDown = (evt: MouseEvent<HTMLCanvasElement>) => {
    const cx = Math.floor(evt.nativeEvent.offsetX / editor.pixelSize);
    const cy = Math.floor(evt.nativeEvent.offsetY / editor.pixelSize);
    run(evt, cx, cy, cx, cy);
    refPreviousX.current = cx;
    refPreviousY.current = cy;

    props.onMouseDown?.(evt);
  };

  const onMouseMove = (evt: MouseEvent<HTMLCanvasElement>) => {
    const cx = Math.floor(evt.nativeEvent.offsetX / editor.pixelSize);
    const cy = Math.floor(evt.nativeEvent.offsetY / editor.pixelSize);
    run(evt, cx, cy, refPreviousX.current || cx, refPreviousY.current || cy);
    refPreviousX.current = cx;
    refPreviousY.current = cy;

    props.onMouseMove?.(evt);
  };

  const onMouseUp = (evt: MouseEvent<HTMLCanvasElement>) => {
    const cx = Math.floor(evt.nativeEvent.offsetX / editor.pixelSize);
    const cy = Math.floor(evt.nativeEvent.offsetY / editor.pixelSize);
    run(evt, cx, cy, cx, cy);

    props.onMouseUp?.(evt);
  };

  return <canvas
    ref={ref}
    {...props}
    className={classNames('editor--canvas', props.className)}
    height={Math.floor(store.clipHeight * editor.pixelSize)}
    width={Math.floor(store.clipWidth * editor.pixelSize)}
    onContextMenu={onContextMenu}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
  />;
});
