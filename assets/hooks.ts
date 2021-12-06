import {MutableRefObject, createContext, useContext, useEffect, useRef, LegacyRef} from "react";
import { DEFAULT_STORE } from "./constants";
import { Store, ForwardedRef } from "./types";

const Context = createContext<Store>(DEFAULT_STORE);

export function useDraw(ref: MutableRefObject<HTMLCanvasElement | undefined>, callback?: (context: CanvasRenderingContext2D, width: number, height: number) => void, dependencies: any[] = []) {
    const store = useStore();
    useEffect(() => {
        if (!ref.current) return;
        const context = ref.current.getContext('2d');
        if (!context) return;
        const { height: canvas_height, width: canvas_width } = ref.current.getBoundingClientRect();
        context.clearRect(0, 0, canvas_width, canvas_height);

        const pixel_height = Math.floor(canvas_height / store.height);
        const pixel_width = Math.floor(canvas_width / store.width);

        console.groupCollapsed('Dimension');
        console.log(`
Art height: ${store.height}
Art width: ${store.width}

Canvas height: ${canvas_height}
Canvas width: ${canvas_width}

Pixel height: ${pixel_height}
Pixel width: ${pixel_width}
        `.trim(), ref.current);
        console.groupEnd();

        callback && callback(context, pixel_width, pixel_height);
    }, [ref, store.height, store.width, ...(dependencies || [])]);
}

export function useForwardedRef<T>(forwardedRef?: ForwardedRef<T>): [MutableRefObject<T | undefined>, LegacyRef<T>] {
    const ref = useRef<T>();
    if (!forwardedRef) return [ref, ref as LegacyRef<T>];
    return [
        ref,
        (node: T) => {
            ref.current = node;
            if (typeof forwardedRef === 'function') {
                forwardedRef(node);
            } else if (forwardedRef) {
                (forwardedRef as MutableRefObject<T>).current = node;
            }
        }
    ];
}

export function useProvider() {
    return Context.Provider;
}

export function useResize(ref: MutableRefObject<HTMLCanvasElement | undefined>) {
    const store = useStore();
    useEffect(() => {
        const onResize = () => {
            if (!ref.current) return;
            const { height, width } = ref.current.getBoundingClientRect();
            ref.current.style['aspect-ratio'] = `${store.width} / ${store.height}`;
            if (width > height) {
                ref.current.style.height = `${height}px`;
                ref.current.style.width = 'auto';
            } else {
                ref.current.style.height = 'auto';
                ref.current.style.width = `${width}px`;
            }
        };

        window.addEventListener('resize', onResize);
        onResize();

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [ref, store.width, store.height]);
}

export function useStore() {
    return useContext(Context);
}
