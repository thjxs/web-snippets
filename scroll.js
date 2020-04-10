class DragScrollElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener("mousedown", function (e) {
      this.started = true;
      this.lastClientY = e.clientY;
      this.lastClientX = e.clientX;
      e.preventDefault();
    });
    this.addEventListener("mousemove", function (e) {
      if (this.started) {
        this.style.cursor = "grabbing";
        this.scrollLeft -= -this.lastClientX + (this.lastClientX = e.clientX);
        this.scrollTop -= -this.lastClientY + (this.lastClientY = e.clientY);
      }
    });
    (function (target) {
      window.addEventListener("mouseup", () => {
        target.started = false;
        target.style.cursor = "grab";
      });
    })(this);
  }
}

window.customElements.define("drag-scroll", DragScrollElement);
