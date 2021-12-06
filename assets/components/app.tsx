import { useStore } from "../hooks";
import CanvasEditor from "./canvas/editor";
import CanvasFrame from "./canvas/frame";
import CanvasLayer from "./canvas/layer";

export default function App() {
    const store = useStore();

    return <main id="pixelart">
        <h1>Pixel Art with css box-shadow</h1>
        <article id="wrapper">
            <section id="wrapper-frame">
                <button className="btn">+</button>
                <div id="container-frame">
                    {store.data.map((frame, idx) => {
                        return <CanvasFrame
                            key={`frame-${idx}`}
                            active={idx === store.frame_idx}
                            frame={frame}
                            height={store.height}
                            width={store.width}
                            onClick={(event) => {
                                event.preventDefault();
                                store.setFrame(idx);
                                store.setLayer(frame.length - 1);
                            }}
                        />;
                    })}
                </div>
            </section>
            <section id="wrapper-layer">
                <button className="btn">+</button>
                <div id="container-layer-helper">
                    n<span>..</span>1
                </div>
                <div id="container-layer">
                    {store.frame.map((layer, idx) => {
                        return <CanvasLayer
                            key={`layer-${idx}`}
                            active={idx === store.layer_idx}
                            layer={layer}
                            height={store.height}
                            width={store.width}
                            onClick={(event) => {
                                event.preventDefault();
                                store.setLayer(idx);
                            }}
                        />;
                    })}
                </div>
            </section>
            <section id="wrapper-preview">
                <CanvasFrame
                    frame={store.data[0]}
                    height={store.height}
                    width={store.width}
                />
            </section>
            <section id="wrapper-editor">
                <CanvasEditor
                    height={store.height}
                    width={store.width}
                />
            </section>
            <Tools />
            <Settings />
        </article>
    </main>;
}

function Settings() {
    return <section id="wrapper-setting" />;
}

function Tools() {
    return <section id="wrapper-tool" />;
}
