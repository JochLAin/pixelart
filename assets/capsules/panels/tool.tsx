import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { MouseEvent } from "react";
import useStore, { Tool } from "../../contexts/store";

export default function ToolPanel() {
  const store = useStore();

  const onClickTool = (tool: Tool) => (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    store.setTool(tool);
  };

  return <article id="tool" className="panel">
    <ul className="panel--grid">
      <li className={classNames(store.tool === 'pencil' && 'active')} onClick={onClickTool('pencil')}>
        <FontAwesomeIcon icon={icon({ name: 'pen', style: 'solid', family: 'sharp' })} />
      </li>
      <li className={classNames(store.tool === 'eraser' && 'active')} onClick={onClickTool('eraser')}>
        <FontAwesomeIcon icon={icon({ name: 'eraser', style: 'solid', family: 'sharp' })} />
      </li>
    </ul>
  </article>;
}
