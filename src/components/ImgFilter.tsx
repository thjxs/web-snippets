import { CSSProperties, useState } from 'react';
import src from '../assets/tmp.png';

interface ImgFilterProps {
  role: string;
  values: string[];
}
export default function ImgFilter(props: ImgFilterProps) {
  const { role, values } = props;
  const [style, setStyle] = useState<CSSProperties>({});

  const updateStyle = (value: string) => {
    const newStyle = { ...style };
    newStyle.filter = `${role}(${value})`;
    setStyle(newStyle);
  };
  return (
    <div>
      <img style={style} src={src} alt="img-filter" />
      <div className="img-filter-action">
        {values.map((v) => (
          <button key={v} onClick={() => updateStyle(v)}>
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
