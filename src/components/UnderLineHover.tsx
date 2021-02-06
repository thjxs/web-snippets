import { HTMLAttributes } from 'react';
import './UnderLineHover.css';

export default function UnderLineHover(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className="underlinehover relative">{props.children}</span>;
}
