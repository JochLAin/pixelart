import {createContext, useContext} from "react";
import { StoreState } from "./builder";

export * from "./builder";
export const StoreContext = createContext<StoreState|null>(null);

export default function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) throw new Error('State context is not available');
  return context;
}

