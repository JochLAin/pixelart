import { ReactNode, useMemo, useState } from "react";
import { DEFAULT_COLOR, DEFAULT_DATA, DEFAULT_HEIGHT, DEFAULT_PALETTE, DEFAULT_TOOL, DEFAULT_WIDTH } from "../constants";
import { useProvider } from "../hooks";
import { Store } from "../types";

export default function AppStore(props: { children?: ReactNode }) {
    const Provider = useProvider();
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [color, setColor] = useState<string>(DEFAULT_COLOR);
    const [tool, setTool] = useState<string>(DEFAULT_TOOL);
    const [frame_idx, setFrame] = useState<number>(0);
    const [layer_idx, setLayer] = useState<number>(0);
    const [palette, setPalette] = useState<string[]>(DEFAULT_PALETTE);
    const [history, setHistory] = useState<[]>([]);
    const [data, setData] = useState<(string|undefined)[][][]>(DEFAULT_DATA);

    const frame = useMemo(() => data[frame_idx], [data, frame_idx]);
    const layer = useMemo(() => frame[layer_idx], [frame, layer_idx]);

    const store: Store = {
        height, setHeight,
        width, setWidth,
        color, setColor,
        tool, setTool,
        frame, frame_idx, setFrame,
        layer, layer_idx, setLayer,
        history, setHistory,
        palette, setPalette,
        data, setData,
    };

    return <Provider value={store}>
        {props.children}
    </Provider>;
}
