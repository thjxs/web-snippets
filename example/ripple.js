const states = new WeakMap();
const rippleSize = 20;
const rippleX = 10;
const rippleY = 10;
class Ripple extends HTMLElement {
  connectedCallback() {
    const state = {
      leaving: false,
      pulsate: false,
      rippleX: 12,
      rippleY: 5,
    };
    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX,
    };
    states.set(this, state);
  }
  get ripple() {
    return this.querySelector('[role=ripple]');
  }
  constructor(props) {
    super(props);
    console.log(props);
  }
}

window.customElements.define('c-ripple', Ripple);
