/**
 * attach event
 *
 * how to rerender
 * createPortal
 */

export default function ShadowRoot1() {
  function attachShadow(e: HTMLParagraphElement) {
    const shadow = e.attachShadow({ mode: 'open' });
    const text = document.createElement('span');
    text.textContent = 'shadow';
    shadow.appendChild(text);
  }

  return (
    <div>
      <p ref={attachShadow}></p>
    </div>
  );
}
