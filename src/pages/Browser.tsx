import { useEffect, useState } from 'react';

export default function Browser() {
  const [firefox, setFirefox] = useState(false);
  const [ie, setIe] = useState(false);
  const [safari, setSafari] = useState(false);
  const [chrome, setChrome] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setFirefox(typeof InstallTrigger !== 'undefined');
    // @ts-ignore
    setIe(!!document.documentMode);
    setSafari(
      Object.prototype.toString
        .call(window.HTMLElement)
        .indexOf('Constructor') > 0
    );
    // @ts-ignore
    setChrome(!!window.chrome);
  }, []);
  return (
    <div>
      <p>firefox: {firefox.toString()}</p>
      <p>ie: {ie.toString()}</p>
      <p>safari: {safari.toString()}</p>
      <p>chrome: {chrome.toString()}</p>
    </div>
  );
}
