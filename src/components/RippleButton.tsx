import { HTMLAttributes, MouseEvent, useState } from 'react';
import './RippleButton.css';

export default function RippleButton(props: HTMLAttributes<HTMLButtonElement>) {
  const [cx, setCx] = useState(0);
  const [cy, setCy] = useState(0);
  const [r, setR] = useState(0);
  const onClick = (e: MouseEvent) => {
    console.log(e.clientX, e.clientY);
    setCy(e.clientY);
    setCx(e.clientX);
    setR(160);
  };

  const onTransitionEnd = () => {
    setCy(0);
    setCx(0);
    setR(1);
  };
  return (
    <button
      className="ripple-button-container"
      onClick={onClick}
      onTransitionEnd={onTransitionEnd}
    >
      {props.children}
      <span className="ripple">
        <svg>
          <circle className="shape" cx={cx} cy={cy} r={r} />
        </svg>
      </span>
    </button>
  );
}
