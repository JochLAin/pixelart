import Tab, { TabItem } from "../../components/tab";
import useStore, { Palette } from "../../contexts/store";

export default function PanelPalette() {
  const store = useStore();

  if (store.palettes.length === 0) {
    return null;
  }

  if (store.palettes.length === 1) {
    return <section className="panel">
      <PaletteList palette={store.palettes[0]} />
    </section>;
  }

  return <section className="panel">
    <Tab bottom>
      {store.palettes.map((palette, idx) => {
        return <TabItem key={`palette-${idx}`} title={<b>#{idx}</b>}>
          <PaletteList palette={palette} />
        </TabItem>
      })}
    </Tab>
  </section>;
}

function PaletteList(props: { palette: Palette }) {
  const store = useStore();

  return <ul className="panel--grid">
    {props.palette.map((color, idx) => {
      return <li
        key={`color-${idx}`}
        style={{ backgroundColor: color }}
        onContextMenu={(evt) => {
          evt.preventDefault();
          store.setColorSecondary(color);
        }}
        onClick={(evt) => {
          evt.preventDefault();
          if (evt.button === 0) {
            store.setColorPrimary(color);
          }
        }}
      />;
    })}
  </ul>
}
