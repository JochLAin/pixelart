export default class Tooltip extends HTMLElement {
  connectedCallback() {
    this.parentElement?.addEventListener('mouseenter', this.onMouseEnter);
    this.parentElement?.addEventListener('mouseleave', this.onMouseLeave);
  }

  disconnectedCallback() {
    this.parentElement?.removeEventListener('mouseenter', this.onMouseEnter);
    this.parentElement?.removeEventListener('mouseleave', this.onMouseLeave);
  }

  onMouseEnter = () => {
    this.classList.add('visible');
  };

  onMouseLeave = () => {
    this.classList.remove('visible');
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "jf-tooltip": any;
    }
  }
}

if (!customElements.get('jf-tooltip')) {
  customElements.define('jf-tooltip', Tooltip);
}
