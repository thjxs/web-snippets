import { useEffect, useState } from 'react';

export default function DocumentHidden() {
  const [visibility, setVisibility] = useState('show');
  useEffect(() => {
    function handle() {
      const v = document.hidden ? 'hidden' : 'show';
      document.title = v;
      setVisibility(v);
    }
    document.addEventListener('visibilitychange', handle);
    return () => {
      document.removeEventListener('visibilitychange', handle);
    };
  }, []);
  return <div>Document: {visibility}</div>;
}
