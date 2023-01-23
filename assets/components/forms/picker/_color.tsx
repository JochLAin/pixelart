import { HTMLProps, forwardRef, useEffect, createRef } from "react";
import classNames from "classnames";

type ColorPickerProps = HTMLProps<HTMLCanvasElement> & {
  value: string,
  onChange: (value: string) => void,
};

export default forwardRef<HTMLCanvasElement, ColorPickerProps>(function ColorPicker(props, ref) {
  ref ||= createRef<HTMLCanvasElement>();

  useEffect(() => {
    const canvas = typeof ref !== 'function' ? ref?.current : null;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const gradient = context.createConicGradient(0, canvas.width / 2, canvas.height / 2);
    gradient.addColorStop(0, "#F00");
    gradient.addColorStop(0.17, "#FF0");
    gradient.addColorStop(0.33, "#0F0");
    gradient.addColorStop(0.50, "#0FF");
    gradient.addColorStop(0.67, "#00F");
    gradient.addColorStop(0.83, "#F0F");
    gradient.addColorStop(1, "#F00");

    context.beginPath();
    context.lineWidth = 16;
    context.strokeStyle = gradient;
    context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 8, 0, 2 * Math.PI, false);
    context.stroke();


  }, []);

  const className = classNames('color-picker', props.className);

  return <canvas {...props} ref={ref} className={className} height={240} width={240} />;
});
