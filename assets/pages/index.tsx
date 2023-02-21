import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from "../capsules";
import { StoreBuilderProps } from "../contexts/store";
import { useLocalStorage } from "../hooks";
import "../../stylesheets/index.scss";
import "../theme";

function Index() {
  const [state, setState] = useLocalStorage<StoreBuilderProps>('pixelart');

  return <App
    {...(state || {})}
    onChange={(state) => {
      const { sprite, spriteHeight, spriteWidth } = state;
      setState({ sprite, height: spriteHeight, width: spriteWidth });
    }}
  />;
}

document.addEventListener("DOMContentLoaded", () => {
  const root = ReactDOM.createRoot(document.querySelector('main') as HTMLElement);

  root.render(
    <StrictMode>
      <Index />
    </StrictMode>
  );
});
