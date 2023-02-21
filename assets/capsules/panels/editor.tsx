import React, { HTMLProps, MouseEvent, WheelEvent, useRef } from "react";
import useEditor from "../../contexts/editor";
import * as utils from "../../utils";

type PanelEditorProps = HTMLProps<HTMLDivElement> & {
  refCanvas: React.RefObject<HTMLCanvasElement>;
};

export default function PanelEditor(props: PanelEditorProps) {
  const { refCanvas, ...attr } = props;
  const refPreviousX = useRef<number|null>(null);
  const refPreviousY = useRef<number|null>(null);
  const editor = useEditor();

  const move = (evt: MouseEvent, cx: number, cy: number) => {
    if (utils.isMouseButtonMiddle(evt)) {
      const dx = cx - (refPreviousX.current || cx);
      const dy = cy - (refPreviousY.current || cy);
      if (dx || dy) {
        editor.move(dx, dy);
      }
    }
    refPreviousX.current = null;
    refPreviousY.current = null;
  };

  const onContextMenu = (evt: MouseEvent) => {
    evt.preventDefault();
  };

  const onMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    const cx = evt.nativeEvent.screenX;
    const cy = evt.nativeEvent.screenY;
    move(evt, cx, cy);
    refPreviousX.current = cx;
    refPreviousY.current = cy;

    props.onMouseDown?.(evt);
  };

  const onMouseMove = (evt: MouseEvent<HTMLDivElement>) => {
    const cx = evt.nativeEvent.screenX;
    const cy = evt.nativeEvent.screenY;
    move(evt, cx, cy);
    if (null === refPreviousX.current) {
      refPreviousX.current = cx;
    }
    if (null === refPreviousY.current) {
      refPreviousY.current = cy;
    }

    props.onMouseMove?.(evt);
  };

  const onScroll = (evt: WheelEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  const onWheel = (evt: WheelEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.stopPropagation();

    const buttons = utils.getMouseValue(evt);
    if (!(utils.isCtrlKey(buttons) || utils.isShiftKey(buttons))) {
      editor.zoom(
        evt.nativeEvent.offsetX,
        evt.nativeEvent.offsetY,
        evt.deltaY >= 0 ? -1 : 1,
      );
    }
  };

  return <article {...attr} onContextMenu={onContextMenu} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onScroll={onScroll} onWheel={onWheel}>
    {props.children}
  </article>;
}

export function PanelEditorFooter() {
  const editor = useEditor();

  return <footer>
    {(editor.positionX !== undefined && editor.positionY !== undefined) ? (
      `${editor.positionY + 1}:${editor.positionX + 1}`
    ) : (
      <b>{'¯\\_(ツ)_/¯'}</b>
    )}
  </footer>;
}