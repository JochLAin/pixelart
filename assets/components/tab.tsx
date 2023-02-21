import classNames from "classnames";
import { Children, HTMLProps, isValidElement, useId, useMemo, useState } from "react";

type TabProps = HTMLProps<HTMLUListElement> & {
  bottom?: boolean,
};

export default function Tab(props: TabProps) {
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

  if (!items.length) {
    return <>{children}</>;
  }

  const tabs = <ul {...props} className={classNames(props.className, 'nav--tabs', props.bottom && 'nav--tabs-bottom')}>
    {items.map((item, idx) => {
      return <li key={`tab-${uuid}-${idx}`} className={classNames(idx === currentIdx && 'active')} onClick={() => setCurrent(idx)}>
        {item.props.title}
      </li>;
    })}
  </ul>;

  const elements = [tabs, items[currentIdx]];
  if (props.bottom) {
    elements.reverse();
  }

  return <>
    {...elements}
    {children}
  </>;
}

export function TabItem(props: { title: any, children: any }) {
  return <>{props.children}</>;
}
