export function getElementDimensions(element: Element): [number, number] {
  const style = getComputedStyle(element);
  const height = parseInt(style.getPropertyValue('height'), 10);
  const width = parseInt(style.getPropertyValue('width'), 10);
  const paddingTop = parseInt(style.getPropertyValue('padding-top'), 10);
  const paddingLeft = parseInt(style.getPropertyValue('padding-left'), 10);
  const paddingBottom = parseInt(style.getPropertyValue('padding-bottom'), 10);
  const paddingRight = parseInt(style.getPropertyValue('padding-right'), 10);
  const borderTop = parseInt(style.getPropertyValue('border-top-width'), 10);
  const borderLeft = parseInt(style.getPropertyValue('border-left-width'), 10);
  const borderBottom = parseInt(style.getPropertyValue('border-bottom-width'), 10);
  const borderRight = parseInt(style.getPropertyValue('border-right-width'), 10);

  return [
    width - paddingLeft - paddingRight - borderLeft - borderRight,
    height - paddingTop - paddingBottom - borderTop - borderBottom,
  ];
}

export function getPixelDimensions(spriteWidth: number, spriteHeight: number, parentWidth: number, parentHeight: number): number {
  if (parentWidth > parentHeight) {
    return Math.floor(parentHeight / spriteHeight);
  }
  return Math.floor(parentWidth / spriteWidth);
}

export function getDefaultPixelDimension(canvas: HTMLCanvasElement, spriteWidth: number, spriteHeight: number): number {
  const [parentWidth, parentHeight] = getElementDimensions(canvas.parentElement as HTMLElement);
  return getPixelDimensions(spriteWidth, spriteHeight, parentWidth, parentHeight);
}
