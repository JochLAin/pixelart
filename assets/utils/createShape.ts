export function createFrame(width: number, height: number) {
  return [createLayer(width, height)];
}

export function createLayer(width: number, height: number) {
  return Array(width * height).fill(undefined);
}

export function createDamier(width: number = 10, height: number = 10, colorEven?: string, colorOdd?: string) {
  return [...Array(width * height)].map((x, idx) => {
    return idx % 2
      ? (Math.floor(idx / width) % 2 ? colorEven : colorOdd)
      : (Math.floor(idx / width) % 2 ? colorOdd : colorEven)
    ;
  });
}

export function createLine(width: number, px: number, py: number, cx: number, cy: number) {
  const pixels = [];

  const dx = Math.abs(cx - px);
  const sx = px < cx ? 1 : -1;
  const dy = -Math.abs(cy - py);
  const sy = py < cy ? 1 : -1;
  let err = dx + dy;

  while (true) {
    pixels.push(py * width + px);
    if (px === cx && py === cy) {
      break;
    }

    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      px += sx;
    }
    if (e2 <= dx) {
      err += dx;
      py += sy;
    }
  }

  return pixels;
}