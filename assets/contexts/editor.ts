import { Reducer, RefObject, createContext, useContext, useEffect, useReducer } from "react";
import * as utils from "../utils";
import useStore from "./store";

type EditorStateProps = {
  pixelSize: number,
  offsetX: number,
  offsetY: number,
};

type EditorState = EditorStateProps & {
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
  const [state, dispatch] = useReducer<EditorReducer>((state, action) => {
    return { ...state, ...action };
  },{
    pixelSize: 10,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    if (ref.current) {
      const pixelSize = utils.getDefaultPixelDimension(ref.current, store.clipWidth, store.clipHeight);
      dispatch({ pixelSize });
    }
  }, []);

  useEffect(() => {
    ref.current?.style.setProperty('--offset-x', `${state.offsetX}px`);
    ref.current?.style.setProperty('--offset-y', `${state.offsetY}px`);
  }, [
    state.offsetX,
    state.offsetY,
  ]);

  return {
    ...state,
    move(x, y) {
      const offsetX = state.offsetX + x;
      const offsetY = state.offsetY + y;

      return dispatch({ offsetX, offsetY });
    },
    zoom(posX: number, posY: number, delta: number) {
      const factor = delta > 0 ? 1.1 : 0.9;
      if ((state.pixelSize * factor) < 1) {
        return;
      }

      return dispatch({
        pixelSize: Math.floor(state.pixelSize * factor),
        offsetX: state.offsetX + Math.round(posX - posX * factor),
        offsetY: state.offsetY + Math.round(posY - posY * factor),
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
