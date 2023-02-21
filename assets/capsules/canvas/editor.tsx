import classNames from "classnames";
import { colord } from "colord";
import React, { HTMLProps, forwardRef, useEffect, useRef, useState } from "react";
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
  const refMouseDown = useRef<number>(0);
  const [currentPainting, setCurrentPainting] = useState<Set<number>>(new Set());

  useCanvas2D(ref, (context) => {
    const frame = store.sprite[store.frameIdx];
    store.drawFrame(context, frame.slice(0, Math.min(store.layerIdx, frame.length)), editor.pixelSize, (color) => colord(color).alpha(0.5).toHex());

    const layer = [...frame[store.layerIdx]];
    currentPainting.forEach((pos) => {
      layer[pos] = store.getColor(refMouseDown.current);
    });

    store.drawLayer(context, layer, editor.pixelSize);
  }, [store.sprite, store.frameIdx, store.layerIdx, editor.pixelSize, currentPainting]);

  function draw(evt: React.MouseEvent<HTMLCanvasElement>, cx: number, cy: number, px: number, py: number) {
    const tool = store.getTool(utils.getMouseValue(evt));
    if (['eraser', 'pencil'].includes(tool)) {
      const line = utils.createLine(store.spriteWidth, px, py, cx, cy);
      const newPainting = new Set<number>([...currentPainting.values(), ...line]);
      if (newPainting.size === currentPainting.size) return;
      setCurrentPainting(newPainting);
    }
  }

  useEffect(() => {
    function apply(value: number) {
      if (!currentPainting.size) return;
      const color = store.getColor(refMouseDown.current);
      store.apply([...currentPainting.values()], color);
      setCurrentPainting(new Set());
      refMouseDown.current = value;
    }

    const onKeyChange = (evt: KeyboardEvent) => {
      const value = utils.getKeyboardValue(evt) + ((refMouseDown.current >> 4) << 4);
      if (value !== refMouseDown.current) {
        apply(value);
      }
    };

    const onMouseUp = (evt: MouseEvent) => {
      const value = utils.getMouseValue(evt);
      if (value !== refMouseDown.current) {
        apply(value);
      }
    };

    const onMouseLeave = () => {
      apply(0);
    };

    document.body.addEventListener('keydown', onKeyChange);
    document.body.addEventListener('keyup', onKeyChange);
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.body.removeEventListener('keydown', onKeyChange);
      document.body.removeEventListener('keyup', onKeyChange);
      document.body.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [currentPainting]);

  const onContextMenu = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    evt.preventDefault();
    props.onContextMenu?.(evt);
  };

  const onMouseDown = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    const { positionX: px, positionY: py } = editor;
    const cx = px === undefined ? Math.floor(evt.nativeEvent.offsetX / editor.pixelSize) : px;
    const cy = py === undefined ? Math.floor(evt.nativeEvent.offsetY / editor.pixelSize) : py;
    refMouseDown.current = utils.getMouseValue(evt);
    if (utils.hasMouseButton(refMouseDown.current)) {
      draw(evt, cx, cy, cx, cy);
    }

    props.onMouseDown?.(evt);
  };

  const onMouseMove = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    const cx = Math.floor(evt.nativeEvent.offsetX / editor.pixelSize);
    const cy = Math.floor(evt.nativeEvent.offsetY / editor.pixelSize);
    if (utils.hasMouseButton(refMouseDown.current)) {
      const { positionX: px, positionY: py } = editor;
      draw(evt, cx, cy, px === undefined ? cx : px, py === undefined ? cy : py);
    }
    editor.hover(cx, cy);

    props.onMouseMove?.(evt);
  };

  const onMouseLeave = (evt: React.MouseEvent<HTMLCanvasElement>) => {
    editor.hover();
    props.onMouseLeave?.(evt);
  };

  return <canvas
    ref={ref}
    {...props}
    height={Math.floor(store.spriteHeight * editor.pixelSize)}
    width={Math.floor(store.spriteWidth * editor.pixelSize)}
    onContextMenu={onContextMenu}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
  />;
});
