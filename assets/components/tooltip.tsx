export default function Tooltip(props: { children?: any }) {
  return <aside className="tooltip">
    {props.children}
  </aside>;
}
