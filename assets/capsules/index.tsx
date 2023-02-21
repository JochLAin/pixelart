import React, {forwardRef, RefObject, useEffect} from "react";
import Tab, { TabItem } from "../components/tab";
import { EditorContext, buildEditorState } from "../contexts/editor";
import { StoreBuilderProps, StoreContext, buildStoreState } from "../contexts/store";
import PanelEditor, { PanelEditorFooter } from "./panels/editor";
import PanelColor from "./panels/color";
import PanelFrame from "./panels/frame";
import PanelLayer from "./panels/layer";
import PanelPalette from "./panels/palette";
import PanelTool from "./panels/tool";
import { useForwardedRef } from "../hooks";
import CanvasEditor from "./canvas/editor";

export default forwardRef<HTMLCanvasElement, StoreBuilderProps>(function Main(props, ref) {
  ref = useForwardedRef<HTMLCanvasElement>(ref);

  useEffect(() => {
    const onScroll = (evt: Event) => {
      evt.preventDefault();
      evt.stopPropagation();
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, []);

  return <StoreProvider {...props}>
    <section>
      <PanelTool />
      <PanelColor />
      <PanelPalette />
    </section>
    <section>
      <EditorProvider refCanvas={ref}>
        <PanelEditor refCanvas={ref}>
          <CanvasEditor ref={ref} />
        </PanelEditor>
        <PanelEditorFooter />
      </EditorProvider>
    </section>
    <section>
      <section>
      </section>
      <section className="panel">
        <Tab>
          <TabItem title="Calques">
            <PanelLayer />
          </TabItem>
          <TabItem title="Frames">
            <PanelFrame />
          </TabItem>
        </Tab>
      </section>
    </section>
  </StoreProvider>;
});

function StoreProvider(props: StoreBuilderProps & { children: any }) {
  const store = buildStoreState(props);

  return <StoreContext.Provider value={store}>
    {props.children}
  </StoreContext.Provider>
}

function EditorProvider(props: { refCanvas: RefObject<HTMLCanvasElement>, children: any }) {
  const editor = buildEditorState(props.refCanvas);

  return <EditorContext.Provider value={editor}>
    {props.children}
  </EditorContext.Provider>;
}