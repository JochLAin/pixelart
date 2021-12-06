import { MutableRefObject } from "react";

export type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
export type Pixel = string | undefined;
export type Layer = Pixel[];
export type Frame = Layer[];
export type Art = Frame[];

export interface Store {
    height: number,
    width: number,
    color: string,
    tool: string,
    history: [],
    frame_idx: number,
    frame: Frame,
    layer_idx: number,
    layer: Layer,
    palette: string[],
    data: Art,

    setHeight: (height: number) => void,
    setWidth: (width: number) => void,
    setColor: (color: string) => void,
    setTool: (tool: string) => void,
    setFrame: (frame_idx: number) => void,
    setLayer: (layer_idx: number) => void,
    setHistory: (history: []) => void,
    setPalette: (palette: string[]) => void,
    setData: (data: Art) => void,
}
