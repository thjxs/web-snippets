const LAZY_SUPPORT = 'loading' in HTMLImageElement.prototype;

class ProgressiveImg extends HTMLElement {
  constructor() {
    super();
    const placeholderElement = this.querySelector('img, svg');
    const width = placeholderElement?.getAttribute('width');
    const height = placeholderElement?.getAttribute('height');
    this._placeholderImg =
      placeholderElement?.tagName === 'IMG' ? placeholderElement : null;
    this._img = this._placeholderImg?.cloneNode(true) || new Image();
    if (LAZY_SUPPORT) {
      return;
    }
    this._observer = new IntersectionObserver(
      (entries, observer) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => {
            this.enhancePlaceholderImage(entry.target);
            this._observer.unobserve(this);
          });
      },
      {
        rootMargin: '0px 0px 200px 0px',
      }
    );
  }
  get src() {
    return this.getAttribute('src');
  }
  get srcset() {
    return this.getAttribute('srcset');
  }
  get sizes() {
    return this.getAttribute('sizes');
  }
}
