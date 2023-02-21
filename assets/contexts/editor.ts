import { Reducer, RefObject, createContext, useContext, useEffect, useReducer } from "react";
import * as utils from "../utils";
import useStore from "./store";
import useCanvasDimensions from "../hooks/useCanvasDimensions";

type EditorStateProps = {
  offsetX: number,
  offsetY: number,
  positionX?: number,
  positionY?: number,
  zoomLevel: number,
};

type EditorState = EditorStateProps & {
  pixelSize: number,
  hover: (x?: number, y?: number) => void,
  move: (x: number, y: number) => void,
  zoom: (x: number, y: number, delta: number) => void,
};

type EditorReducer = Reducer<
  EditorStateProps,
  Partial<EditorStateProps>
>;

export const EditorContext = createContext<EditorState|null>(null);

export function buildEditorState(ref: RefObject<HTMLCanvasElement>): EditorState {
  const store = useStore();
  const pixelSize = useCanvasDimensions(ref, store.spriteWidth, store.spriteHeight);

  const [state, dispatch] = useReducer<EditorReducer>(
    (state, action) => ({ ...state, ...action }), {
    offsetX: 0,
    offsetY: 0,
    zoomLevel: 1,
  });

  useEffect(() => {
    ref.current?.style.setProperty('--offset-x', `${state.offsetX}px`);
    ref.current?.style.setProperty('--offset-y', `${state.offsetY}px`);
  }, [
    state.offsetX,
    state.offsetY,
  ]);

  return {
    pixelSize: Math.floor(pixelSize * state.zoomLevel),
    ...state,
    hover(x, y) {
      return dispatch({ positionX: x, positionY: y });
    },
    move(x, y) {
      const offsetX = state.offsetX + x;
      const offsetY = state.offsetY + y;

      return dispatch({ offsetX, offsetY });
    },
    zoom(posX: number, posY: number, delta: number) {
      const factor = delta > 0 ? 1.1 : 0.9;
      if ((pixelSize * factor) < 10) {
        return;
      }

      const { offsetX, offsetY } = state;
      return dispatch({
        offsetX: Math.floor(offsetX * factor + (posX - posX * factor)),
        offsetY: Math.floor(offsetY * factor + (posY - posY * factor)),
        zoomLevel: state.zoomLevel * factor,
      });
    }
  };
}

export default function useContextEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useContextEditor must be used within a EditorProvider');
  }
  return context;
}
