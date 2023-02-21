import React from "react";

const CTRL_KEY     = 0b0000001;
const ALT_KEY      = 0b0000010;
const SHIFT_KEY    = 0b0000100;
const META_KEY     = 0b0001000;
const MOUSE_LEFT   = 0b0010000;
const MOUSE_RIGHT  = 0b0100000;
const MOUSE_MIDDLE = 0b1000000;

type InputEventType = KeyboardEvent|MouseEvent|React.KeyboardEvent|React.MouseEvent;

export function getKeyboardValue(evt: InputEventType) {
  return Number(evt.ctrlKey)
    + Number(evt.altKey) * 2
    + Number(evt.shiftKey) * 4
    + Number(evt.metaKey) * 8
  ;
}

export function getMouseValue(evt: InputEventType) {
  let value = getKeyboardValue(evt);
  if ('buttons' in evt) {
    value += evt.buttons << 4;
  }

  return value;
}

export function isCtrlKey(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & CTRL_KEY);
}

export function isAltKey(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & ALT_KEY);
}

export function isShiftKey(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & SHIFT_KEY);
}

export function isMetaKey(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & META_KEY);
}

export function hasMouseButton(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & (MOUSE_LEFT | MOUSE_RIGHT));
}

export function isMouseButtonLeft(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & MOUSE_LEFT);
}

export function isMouseButtonRight(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & MOUSE_RIGHT);
}

export function isMouseButtonMiddle(button: number|InputEventType) {
  if (typeof button !== 'number') {
    button = getMouseValue(button);
  }
  return !!(button & MOUSE_MIDDLE);
}
