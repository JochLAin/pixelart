import useStore from "../../contexts/store";

export default function ColorPanel() {
  const store = useStore();

  return <section>
    <div className="square" style={{ backgroundColor: store.colorPrimary }} />
    <div className="square" style={{ backgroundColor: store.colorSecondary }} />
  </section>;
}
