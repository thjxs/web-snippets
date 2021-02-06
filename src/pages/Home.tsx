import HeadWithSubTitle from '../components/HeadWithSubTitle';
import RippleButton from '../components/RippleButton';
import UnderLineHover from '../components/UnderLineHover';

export default function Home() {
  return (
    <div>
      <HeadWithSubTitle title="small component">
        Head with sub title
      </HeadWithSubTitle>
      <p>
        <UnderLineHover>underline hover</UnderLineHover>
      </p>
      <p>
        Ripple: <RippleButton>button</RippleButton>
      </p>
      <p></p>
    </div>
  );
}
