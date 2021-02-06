export default function OpenPrint() {
  function printPage() {
    const f = document.createElement('iframe');
    f.onload = function onload() {
      if (f.contentWindow) {
        f.contentWindow.onbeforeunload = function () {
          document.body.removeChild(f);
        };
        f.contentWindow.onafterprint = function () {
          document.body.removeChild(f);
        };
        f.contentWindow.focus();
        f.contentWindow.print();
      }
    };

    f.style.position = 'fixed';
    f.style.right = '0';
    f.style.bottom = '0';
    f.style.width = '0';
    f.style.height = '0';
    f.style.border = '0';
    f.src = 'http://localhost:3000/image-filter';
    document.body.appendChild(f);
  }
  return <button onClick={printPage}>Print external page!</button>;
}
