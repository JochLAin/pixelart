import classNames from "classnames";
import { MouseEvent } from "react";
import useStore from "../../contexts/store";

export default function FramePanel() {
  const store = useStore();

  const onClickFrameAdd = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    store.addFrame();
  };

  return <>
    <ul id="frame" className="panel--list">
      {store.clip.map((frame, idx) => {
        const className = classNames({
          active: idx === store.frameIdx,
        });

        const onClick = (evt: MouseEvent<HTMLLIElement>) => {
          evt.preventDefault();
          store.setFrameIdx(idx);
        };

        return <li key={`frame-${idx}`} className={className} onClick={onClick}>
          Frame {idx + 1}
        </li>;
      })}
    </ul>
  </>;
}
