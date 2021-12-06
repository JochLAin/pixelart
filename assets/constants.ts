import { Art } from "./types";

export const TOOL_EYE_DROPPER: string = 'eye_dropper';
export const TOOL_ERASER: string = 'eraser';
export const TOOL_FILL: string = 'fill';
export const TOOL_PENCIL: string = 'pencil';
export const TOOLS: string[] = [TOOL_ERASER, TOOL_EYE_DROPPER, TOOL_FILL, TOOL_PENCIL];

export const DEFAULT_COLOR: string = '#000';
export const DEFAULT_HEIGHT: number = 10;
export const DEFAULT_PALETTE: string[] = [];
export const DEFAULT_TOOL: string = TOOL_PENCIL;
export const DEFAULT_WIDTH: number = 10;
export const DEFAULT_HISTORY: [] = [];
// export const DEFAULT_DATA: (string|undefined)[][][] = [[Array(DEFAULT_WIDTH * DEFAULT_HEIGHT)]];

const DAMIER: (string|undefined)[] = [
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
];

const REVERSE_DAMIER: (string|undefined)[] = [
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
];

const LAYER_0_0: (string|undefined)[] = [
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
];

const LAYER_0_1: (string|undefined)[] = [
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
];

const LAYER_1_0: (string|undefined)[] = [
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
    undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined, '#000',
    '#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,'#000', undefined,
];

const LAYER_1_1: (string|undefined)[] = [
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
    '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined,
    undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF', undefined, '#FFF',
];

export const DEFAULT_DATA: (string|undefined)[][][] = [
    [LAYER_0_0, LAYER_0_1],
    [LAYER_1_0, LAYER_1_1],
];

export const DEFAULT_STORE = {
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    color: DEFAULT_COLOR,
    tool: DEFAULT_TOOL,
    frame: [],
    frame_idx: 0,
    layer: [],
    layer_idx: 0,
    history: DEFAULT_HISTORY,
    palette: DEFAULT_PALETTE,
    data: DEFAULT_DATA,

    setHeight: (height: number) => {},
    setWidth: (width: number) => {},
    setColor: (color: string) => {},
    setTool: (tool: string) => {},
    setFrame: (frame_idx: number) => {},
    setLayer: (layer_idx: number) => {},
    setHistory: (history: []) => {},
    setPalette: (palette: string[]) => {},
    setData: (data: Art) => {},
};
