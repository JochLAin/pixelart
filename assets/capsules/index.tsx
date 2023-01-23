import { forwardRef, useEffect } from "react";
import Tab, { TabItem } from "../components/tab";
import { StoreBuilderProps, StoreContext, buildStoreState } from "../contexts/store";
import CanvasFrame from "./canvas/frame";
import PanelEditor from "./panels/editor";
import PanelFrame from "./panels/frame";
import PanelLayer from "./panels/layer";
import PanelTool from "./panels/tool";
import Settings from "./settings";

export default forwardRef<HTMLCanvasElement, StoreBuilderProps>(function Main(props, ref) {
  const store = buildStoreState(props);

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

  return <StoreContext.Provider value={store}>
    <div id="container-layer-frame" className="panel">
      <Tab>
        <TabItem title="Calques">
          <PanelLayer />
        </TabItem>
        <TabItem title="Frames">
          <PanelFrame />
        </TabItem>
      </Tab>
    </div>
    <PanelTool />
    <section id="preview">
      <CanvasFrame frame={store.clip[0]} />
    </section>
    <PanelEditor ref={ref} />
    <Settings />
  </StoreContext.Provider>;
});
