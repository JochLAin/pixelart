import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { MouseEvent } from "react";
import useStore from "../../contexts/store";

export default function LayerPanel() {
  const store = useStore();

  const onClickLayerAdd = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    store.addLayer();
  };

  return <>
    <ul id="layer" className="panel--list">
      {store.frame.map((layer, idx) => {
        const className = classNames('layer--item', {
          active: idx === store.layerIdx,
        });

        const onClick = (evt: MouseEvent<HTMLLIElement>) => {
          evt.preventDefault();
          store.setLayerIdx(idx);
        };

        return <li key={`layer-${idx}`} className={className} onClick={onClick}>
          {`Calque ${idx + 1}`}
        </li>;
      })}
    </ul>
  </>
}

