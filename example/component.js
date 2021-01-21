class Custom extends HTMLAnchorElement {
  constructor() {
    super();
  }
  connectedCallback() {
    console.log('??');
    this.style.fontSize = '50px';
  }
}

window.customElements.define('c-a', Custom, { extends: 'a' });
