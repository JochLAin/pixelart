import classNames from "classnames";
import { Children, HTMLProps, isValidElement, useId, useMemo, useState } from "react";

export default function Tab(props: HTMLProps<HTMLUListElement>) {
  const [currentIdx, setCurrent] = useState<number>(0);
  const uuid = useId();

  const [items, children] = useMemo(() => {
    return Children.toArray(props.children).reduce<[any[], any[]]>((accu, child) => {
      if (isValidElement(child) && child.type === TabItem) {
        return [[...accu[0], child], accu[1]];
      }
      return [accu[0], [...accu[1], child]];
    }, [[], []])
  }, [props.children]);

  return <>
    {!!items.length && (
      <>
        <ul {...props} className={classNames(props.className, 'nav--tab')}>
          {items.map((item, idx) => {
            return <li key={`tab-${uuid}-${idx}`} className={classNames(idx === currentIdx && 'active')} onClick={() => setCurrent(idx)}>
              {item.props.title}
            </li>;
          })}
        </ul>
        {items[currentIdx]}
      </>
    )}
    {children}
  </>;
}

export function TabItem(props: { title: string, children: any }) {
  return <>{props.children}</>;
}
