import React, { HTMLProps, createRef, forwardRef, useCallback, useEffect, useState, useRef } from "react";

type ColorPickerProps = HTMLProps<HTMLInputElement> & {

};

export const PRECISION = 10e7;

function getHueFromPoint(x: number, y: number) {
  return (Math.atan2(y, x) * 180 / Math.PI + 180) - 90;
}

function getWhiteFromPoint(x2: number, y2: number, angle: number = 0) {
  angle += Math.PI / 6;
  const b = y2 - Math.cos(angle) * x2;
  const y1 = b / (Math.cos(angle + Math.PI / 2) + Math.cos(angle));
  const x1 = y1 / Math.cos(angle + Math.PI / 2);

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getBlackFromPoint(x2: number, y2: number, angle: number = 0) {
  angle += Math.PI * 5 / 6;
  const b = y2 - Math.cos(angle) * x2;
  const y1 = b / (Math.cos(angle - Math.PI / 2) + Math.cos(angle));
  const x1 = y1 / Math.cos(angle - Math.PI / 2);

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export default forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(props, refInput) {
  refInput ||= createRef<HTMLInputElement>();
  const refPickerElement = createRef<HTMLDivElement>();
  const refTriangleElement = createRef<HTMLDivElement>();
  const refCircleMouseDown = useRef<boolean>(false);
  const refTriangleMouseDown = useRef<boolean>(false);
  const [value, setValue] = useState(props.value);

  const setHueValue = useCallback((x: number, y: number) => {
    if (!refPickerElement.current) return;

    const rect = refPickerElement.current.getBoundingClientRect();
    const hue = getHueFromPoint(
      x - rect.left - rect.width / 2,
      y - rect.top - rect.height / 2,
    );

    refPickerElement.current.style.setProperty('--color-picker-hue', hue.toString());
  }, [refPickerElement]);

  const setWhiteBlackValue = useCallback((x: number, y: number) => {
    if (!refPickerElement.current) return;
    if (!refTriangleElement.current) return;

    const rect = refTriangleElement.current.getBoundingClientRect();
    const before = getComputedStyle(refTriangleElement.current, '::before');

    const width = parseFloat(before.getPropertyValue('width'));
    const height = (width * Math.sqrt(3) / 2);
    const pointerX = (x - rect.left - parseFloat(before.getPropertyValue('left'))) / height;
    const pointerY = (height - (y - rect.top - parseFloat(before.getPropertyValue('top')))) / height;

    const white = 1 - getWhiteFromPoint(pointerX, pointerY);
    const black = 1 - getBlackFromPoint(width - pointerX, pointerY);

    refPickerElement.current.style.setProperty('--color-picker-white', white.toString());
    refPickerElement.current.style.setProperty('--color-picker-black', black.toString());

    // if (!CSS.supports('top: calc(100px * sin(120deg))')) {
      refPickerElement.current.style.setProperty('--color-picker-pointer-x', `${x - rect.left}px`);
      refPickerElement.current.style.setProperty('--color-picker-pointer-y', `${y - rect.top}px`);
    // }
  }, [refPickerElement, refTriangleElement]);

  useEffect(() => {
    const onMouseMove = (evt: MouseEvent) => {
      if (refPickerElement.current && refTriangleElement.current) {
        if (refCircleMouseDown.current || refTriangleMouseDown.current) {
          if (refCircleMouseDown.current) {
            setHueValue(evt.clientX, evt.clientY);
          } else if (refTriangleMouseDown.current) {
            setWhiteBlackValue(evt.clientX, evt.clientY);
          }
        }
      }
    };

    const onLeave = () => {
      refCircleMouseDown.current = false;
      refTriangleMouseDown.current = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onLeave);
    document.body.addEventListener('mouseleave', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onLeave);
      document.body.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onCircleMouseDown = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    refCircleMouseDown.current = true;
    setHueValue(evt.clientX, evt.clientY);
  };

  const onCircleMouseUp = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    refCircleMouseDown.current = false;
    refTriangleMouseDown.current = false;
  };

  const onTriangleMouseDown = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    refTriangleMouseDown.current = true;
    setWhiteBlackValue(evt.clientX, evt.clientY);
  };

  const onTriangleMouseUp = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    refCircleMouseDown.current = false;
    refTriangleMouseDown.current = false;
  };

  return <aside ref={refPickerElement} className="color-picker">
    <input {...props} ref={refInput} type="color" value={value} readOnly />
    <div className="color-picker--circle" onMouseDown={onCircleMouseDown} onMouseUp={onCircleMouseUp} />
    <div ref={refTriangleElement} className="color-picker--triangle" onMouseDown={onTriangleMouseDown} onMouseUp={onTriangleMouseUp}>
      <div className="color-picker--triangle-patch" />
    </div>
    <div className="color-picker--triangle-pointer" />
  </aside>;
});
