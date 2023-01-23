import { MouseEvent } from "react";

const CTRL_KEY     = 0b0000001;
const ALT_KEY      = 0b0000010;
const SHIFT_KEY    = 0b0000100;
const META_KEY     = 0b0001000;
const MOUSE_LEFT   = 0b0010000;
const MOUSE_RIGHT  = 0b0100000;
const MOUSE_MIDDLE = 0b1000000;

export function getInputValue(evt: MouseEvent) {
  return Number(evt.ctrlKey)
    + Number(evt.altKey) * 2
    + Number(evt.shiftKey) * 4
    + Number(evt.metaKey) * 8
    + (evt.buttons << 4)
  ;
}

export function isCtrlKey(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & CTRL_KEY);
}

export function isAltKey(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & ALT_KEY);
}

export function isShiftKey(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & SHIFT_KEY);
}

export function isMetaKey(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & META_KEY);
}

export function isMouseButtonLeft(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & MOUSE_LEFT);
}

export function isMouseButtonRight(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & MOUSE_RIGHT);
}

export function isMouseButtonMiddle(button: number|MouseEvent) {
  if (typeof button !== 'number') {
    button = getInputValue(button);
  }
  return !!(button & MOUSE_MIDDLE);
}
