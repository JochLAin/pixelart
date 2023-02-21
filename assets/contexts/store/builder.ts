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
export type Tool = 'pencil'|'eraser'|'fill'|'pipette'|'line'|'square'|'circle'|'zoom-in'|'zoom-out'|'zoom-reset'|'resize';

export type StoreStateProps = {
  spriteHeight: number,
  spriteWidth: number,
  sprite: Clip,
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
  setSpriteHeight: Dispatch<SetStateAction<number>>,
  setSpriteWidth: Dispatch<SetStateAction<number>>,
  setSprite: Dispatch<SetStateAction<Clip>>,
  setFrameIdx: Dispatch<SetStateAction<number>>,
  setLayerIdx: Dispatch<SetStateAction<number>>,
  setPalettes: Dispatch<SetStateAction<Palette[]>>,
  setPaletteIdx: Dispatch<SetStateAction<number>>,
  setColorPrimary: Dispatch<SetStateAction<Pixel>>,
  setColorSecondary: Dispatch<SetStateAction<Pixel>>,
  setTool: Dispatch<SetStateAction<Tool>>,
  setHistory: Dispatch<SetStateAction<History[]>>,
  setMode: Dispatch<SetStateAction<Mode>>,
};

export const DEFAULT_SIZE: number = 32;
export const DEFAULT_HEIGHT: number = DEFAULT_SIZE;
export const DEFAULT_WIDTH: number = DEFAULT_SIZE;
const DEFAULT_PALETTE = [
  '#FFFFFF',
  '#000000',
  '#EE720F',
  '#CF1A5C',
  '#6382C4',
  '#2B203F',
  '#903C58',
  '#F0A6B5',
  '#00007F'
];

const getInitialState = (width: number = DEFAULT_WIDTH, height: number = DEFAULT_HEIGHT, sprite?: Clip): StoreStateProps => ({
  sprite: sprite || [utils.createFrame(width, height)],
  spriteWidth: width,
  spriteHeight: height,
  frameIdx: 0,
  layerIdx: 0,
  palettes: [DEFAULT_PALETTE],
  paletteIdx: 0,
  colorPrimary: DEFAULT_PALETTE[2],
  colorSecondary: DEFAULT_PALETTE[8],
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
  addFrame(frameIdx: number = state.frameIdx, frame = utils.createFrame(state.spriteWidth, state.spriteHeight)) {
    return dispatch({
      frameIdx: frameIdx + 1,
      layerIdx: frame && state.layerIdx > frame.length ? frame.length - 1 : state.layerIdx,
      sprite: [...state.sprite.slice(0, frameIdx + 1), frame, ...state.sprite.slice(frameIdx + 1)],
    });
  },
  addLayer(frameIdx: number = state.frameIdx, layerIdx: number = state.layerIdx, layer = utils.createLayer(state.spriteWidth, state.spriteHeight)) {
    return dispatch({
      frameIdx,
      layerIdx: layerIdx + 1,
      sprite: state.sprite.map((frame, _idx) => {
        if (_idx !== frameIdx) return frame;
        return [...frame.slice(0, layerIdx + 1), layer, ...frame.slice(layerIdx + 1)];
      }),
    });
  },
  drawClip(context: CanvasRenderingContext2D, sprite: Clip, pixelSize: number, modifier?: (color: string) => string) {
    for (let idx = 0; idx < sprite.length; idx++) {
      this.drawFrame(context, sprite[idx], pixelSize, modifier);
    }
  },
  drawFrame(context: CanvasRenderingContext2D, frame: Frame, pixelSize: number, modifier?: (color: string) => string) {
    for (let idx = 0; idx < frame.length; idx++) {
      this.drawLayer(context, frame[idx], pixelSize, modifier);
    }
  },
  drawLayer(context: CanvasRenderingContext2D, layer: Layer, pixelSize: number, modifier?: (color: string) => string) {
    for (let pixelIdx = 0; pixelIdx < layer.length; pixelIdx++) {
      const color = layer[pixelIdx];
      if (!color) continue;
      const y = Math.floor(pixelIdx / state.spriteHeight) * pixelSize;
      const x = (pixelIdx % state.spriteWidth) * pixelSize;
      context.fillStyle = modifier ? modifier(color) : color;
      context.fillRect(x, y, pixelSize, pixelSize);
    }
  },
  apply(pixels: number[], color: Pixel) {
    return dispatch({
      sprite: state.sprite.map((frame, idx) => {
        if (idx !== state.frameIdx) return frame;
        return frame.map((layer, idx) => {
          if (idx !== state.layerIdx) return layer;
          return layer.map((pixel, idx) => {
            if (pixels.includes(idx)) return color;
            return pixel;
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
      layerIdx: state.sprite[frameIdx].length - 1,
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
  sprite?: Clip,
  width?: number,
  height?: number,
  onChange?: (state: StoreStateProps) => void,
};

export function buildStoreState(props: StoreBuilderProps): StoreState {
  const [state, dispatch] = useReducer<Reducer<StoreStateProps, Partial<StoreStateProps>>>(
    (state, action) => ({ ...state, ...action }),
    getInitialState(props.width, props.height, props.sprite),
  );

  useEffect(() => {
    props.onChange?.(state);
  }, [state]);

  const frame = useMemo(() => state.sprite[state.frameIdx], [state.sprite, state.frameIdx]);
  const layer = useMemo(() => frame[state.layerIdx], [frame, state.layerIdx]);
  const actions = useMemo(() => getActions(state, dispatch), [state, dispatch]);

  const proxy = new Proxy({ ...state, frame, layer }, {
    get(target, prop, receiver) {
      if (typeof prop === 'string') {
        const action = Reflect.get(actions, prop, receiver);
        if (action) return action;
        if (prop.slice(0, 3) === 'set') {
          const field = `${prop[3].toLowerCase()}${prop.slice(4)}`;
          const value = Reflect.get(state, field, receiver);
          if (value) {
            return (action: any) => {
              const v = typeof action === 'function' ? action(value) : action;
              dispatch({ [field]: v });
            };
          }
        }
      }
      return Reflect.get(target, prop, receiver);
    },
  });

  return proxy as StoreState;
}
