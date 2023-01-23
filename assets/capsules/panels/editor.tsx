import React, { HTMLProps, MouseEvent, WheelEvent, forwardRef, useRef } from "react";
import { useForwardedRef } from "../../hooks";
import { EditorContext, buildEditorState } from "../../contexts/editor";
import * as utils from "../../utils";
import CanvasEditor from "../canvas/editor";

type PanelEditorProps = HTMLProps<HTMLDivElement> & {

};

export default forwardRef<HTMLCanvasElement, PanelEditorProps>(function PanelEditor(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);
  const refPreviousX = useRef<number|null>(null);
  const refPreviousY = useRef<number|null>(null);
  const state = buildEditorState(ref);

  const move = (evt: MouseEvent, cx: number, cy: number) => {
    if (utils.isMouseButtonMiddle(evt)) {
      const dx = cx - (refPreviousX.current || cx);
      const dy = cy - (refPreviousY.current || cy);
      if (dx || dy) {
        state.move(dx, dy);
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

    const buttons = utils.getInputValue(evt);
    if (!(utils.isCtrlKey(buttons) || utils.isShiftKey(buttons))) {
      state.zoom(
        evt.nativeEvent.offsetX,
        evt.nativeEvent.offsetY,
        evt.deltaY >= 0 ? -1 : 1,
      );
    }
  };

  return <EditorContext.Provider value={state}>
    <section {...props} id="editor" onContextMenu={onContextMenu} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onScroll={onScroll} onWheel={onWheel}>
      <CanvasEditor ref={ref} />
    </section>
  </EditorContext.Provider>;
});
