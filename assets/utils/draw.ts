import { Clip, Frame, Layer } from "../contexts/store";

export function drawClip(context: CanvasRenderingContext2D, sprite: Clip, width: number, height: number, size: number, modifier: (color: string) => string = ((c) => c)) {
  for (let idx = 0; idx < sprite.length; idx++) {
    drawFrame(context, sprite[idx], width, height, size, modifier);
  }
}

export function drawFrame(context: CanvasRenderingContext2D, frame: Frame, width: number, height: number, size: number, modifier: (color: string) => string = ((c) => c)) {
  for (let idx = 0; idx < frame.length; idx++) {
    drawLayer(context, frame[idx], width, height, size, modifier);
  }
}

export function drawLayer(context: CanvasRenderingContext2D, layer: Layer, width: number, height: number, size: number, modifier: (color: string) => string = ((c) => c)) {
  for (let pixelIdx = 0; pixelIdx < layer.length; pixelIdx++) {
    const color = layer[pixelIdx];
    if (!color) continue;
    const y = Math.floor(pixelIdx / height) * size;
    const x = (pixelIdx % width) * size;
    context.fillStyle = modifier(color);
    context.fillRect(x, y, size, size);
  }
}
