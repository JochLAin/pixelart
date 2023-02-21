import React, { Reducer, useEffect, useReducer } from "react";

type KeyboardTouchState = {
  altKey: boolean,
  ctrlKey: boolean,
  shiftKey: boolean,
  metaKey: boolean,
};

type CallbackType = (state: KeyboardTouchState, previousState: KeyboardTouchState) => void;
type ListenerType = (evt: KeyboardEvent|MouseEvent|React.KeyboardEvent|React.MouseEvent) => void;

export function useKeyboardTouch(callback?: CallbackType): [KeyboardTouchState, ListenerType] {
  const [state, dispatch] = useReducer<Reducer<KeyboardTouchState, Partial<KeyboardTouchState>>>(
    (state, action) => {
      const newState = { ...state, ...action };
      callback?.(newState, state);
      return newState;
    },
    { altKey: false, ctrlKey: false, shiftKey: false, metaKey: false }
  );

  const listener = (evt: KeyboardEvent|MouseEvent|React.KeyboardEvent|React.MouseEvent) => {
    const { altKey, ctrlKey, shiftKey, metaKey } = evt;
    dispatch({ altKey, ctrlKey, shiftKey, metaKey });
  };

  return [state, listener];
}

export function useDocumentKeyboardTouch(callback?: CallbackType): KeyboardTouchState {
  const [state, listener] = useKeyboardTouch(callback);

  useEffect(() => {
    document.addEventListener('keydown', listener);
    document.addEventListener('keyup', listener);

    return () => {
      document.removeEventListener('keydown', listener);
      document.removeEventListener('keyup', listener);
    };
  }, [listener]);

  return state;
}
