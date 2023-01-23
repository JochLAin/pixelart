import { Dispatch, Reducer, SetStateAction, useEffect, useMemo, useReducer } from "react";
import * as utils from "../../utils";

export type Action = { previous: Pixel, color: Pixel, frameIdx: number, layerIdx: number, pixelIdx: number };
export type Clip = Frame[];
export type Frame = Layer[];
export type History = Action[];
export type Layer = Pixel[];
export type Mode = 'config'|'draw';
export type Palette = Pixel[];
export type Pixel = string|undefined;
export type Tool = 'pencil'|'eraser'|'pipette';

export type StoreStateProps = {
  clipHeight: number,
  clipWidth: number,
  clip: Clip,
  frameIdx: number,
  layerIdx: number,
  palettes: Palette[],
  paletteIdx: number,
  colorPrimary: Pixel,
  colorSecondary: Pixel,
  tool: Tool,
  history: History[],
  mode: Mode,
};

export type StoreStateSetters = {
  setClipHeight: Dispatch<SetStateAction<number>>,
  setClipWidth: Dispatch<SetStateAction<number>>,
  setClip: Dispatch<SetStateAction<Clip>>,
  setFrameIdx: Dispatch<SetStateAction<number>>,
  setLayerIdx: Dispatch<SetStateAction<number>>,
  setPalettes: Dispatch<SetStateAction<Palette[]>>,
  setPaletteIdx: Dispatch<SetStateAction<number>>,
  setColorPrimary: Dispatch<SetStateAction<number>>,
  setColorSecondary: Dispatch<SetStateAction<number>>,
  setTool: Dispatch<SetStateAction<Tool>>,
  setHistory: Dispatch<SetStateAction<History[]>>,
  setMode: Dispatch<SetStateAction<Mode>>,
};

export const DEFAULT_HEIGHT: number = 10;
export const DEFAULT_WIDTH: number = 10;

const getInitialState = (width: number = 10, height: number = 10, clip?: Clip): StoreStateProps => ({
  clip: clip || [utils.createFrame(width, height)],
  clipWidth: width,
  clipHeight: height,
  frameIdx: 0,
  layerIdx: 0,
  palettes: [['#FFFFFF','#000000']],
  paletteIdx: 0,
  colorPrimary: '#FFFFFF',
  colorSecondary: '#000000',
  tool: 'pencil',
  history: [],
  mode: 'draw',
});

const getActions = (state: StoreStateProps, dispatch: Dispatch<Partial<StoreStateProps>>) => ({
  addColor(color: Pixel, paletteIdx: number = state.paletteIdx) {
    return dispatch({
      palettes: state.palettes.map((palette, idx) => {
        if (idx !== paletteIdx) return palette;
        return [...palette, color];
      }),
    });
  },
  addFrame(frameIdx: number = state.frameIdx, frame = utils.createFrame(state.clipWidth, state.clipHeight)) {
    return dispatch({
      frameIdx: frameIdx + 1,
      layerIdx: frame && state.layerIdx > frame.length ? frame.length - 1 : state.layerIdx,
      clip: [...state.clip.slice(0, frameIdx + 1), frame, ...state.clip.slice(frameIdx + 1)],
    });
  },
  addLayer(frameIdx: number = state.frameIdx, layerIdx: number = state.layerIdx, layer = utils.createLayer(state.clipWidth, state.clipHeight)) {
    return dispatch({
      frameIdx,
      layerIdx: layerIdx + 1,
      clip: state.clip.map((frame, _idx) => {
        if (_idx !== frameIdx) return frame;
        return [...frame.slice(0, layerIdx + 1), layer, ...frame.slice(layerIdx + 1)];
      }),
    });
  },
  draw(pixels: number[], color: Pixel) {
    return dispatch({
      clip: state.clip.map((frame, frameIdx) => {
        if (frameIdx !== state.frameIdx) return frame;
        return frame.map((layer, layerIdx) => {
          if (layerIdx !== state.layerIdx) return layer;
          return layer.map((pixel, pixelIdx) => {
            if (!pixels.includes(pixelIdx)) return pixel;
            return color;
          });
        });
      }),
    });
  },
  getColor(buttons: number): Pixel {
    const tool = this.getTool(buttons);
    if (tool === 'eraser') {
      return undefined;
    }
    if (tool === 'pencil') {
      if (utils.isMouseButtonRight(buttons)) {
        return state.colorSecondary;
      }
    }
    return state.colorPrimary;
  },
  getTool(buttons: number): Tool {
    if (state.tool === 'pencil') {
      if (utils.isAltKey(buttons)) {
        return 'eraser';
      }
    }
    return state.tool;
  },
  setColor(color: Pixel, paletteIdx: number, colorIdx: number) {
    return dispatch({
      palettes: state.palettes.map((palette, idx) => {
        if (idx !== paletteIdx) return palette;
        return palette.map((c, idx) => {
          if (idx !== colorIdx) return c;
          return color;
        });
      }),
    });
  },
  setFrameIdx(frameIdx: number) {
    return dispatch({
      frameIdx,
      layerIdx: state.clip[frameIdx].length - 1,
    });
  },
});

const DEFAULT_ACTIONS = getActions(getInitialState(DEFAULT_HEIGHT, DEFAULT_WIDTH), () => {});

export type StoreStateActionType = typeof DEFAULT_ACTIONS;
export type StoreState = StoreStateProps & StoreStateSetters & StoreStateActionType & {
  color: Pixel,
  frame: Frame,
  layer: Layer,
  tool: Tool,
};

export type StoreBuilderProps = {
  clip?: Clip,
  width?: number,
  height?: number,
  onChange?: (state: StoreStateProps) => void,
};

export function buildStoreState(props: StoreBuilderProps): StoreState {
  const [state, dispatch] = useReducer<Reducer<StoreStateProps, Partial<StoreStateProps>>>(
    (state, action) => ({ ...state, ...action }),
    getInitialState(props.width, props.height, props.clip),
  );

  useEffect(() => {
    props.onChange?.(state);
  }, [state]);

  const frame = useMemo(() => state.clip[state.frameIdx], [state.clip, state.frameIdx]);
  const layer = useMemo(() => frame[state.layerIdx], [frame, state.layerIdx]);
  const actions = useMemo(() => getActions(state, dispatch), [state, dispatch]);

  const proxy = new Proxy({ ...state, frame, layer }, {
    get(target, prop, receiver) {
      if (typeof prop === 'string') {
        if (Object.keys(actions).includes(prop)) {
          return actions[prop];
        }
        if (prop.slice(0, 3) === 'set') {
          const field = `${prop[3].toLowerCase()}${prop.slice(4)}`;
          if (state[field]) {
            return (action: any) => {
              const value = typeof action === 'function' ? action(state[field]) : action;
              dispatch({ [field]: value });
            };
          }
        }
      }
      return Reflect.get(target, prop, receiver);
    },
  });

  return proxy as StoreState;
}
