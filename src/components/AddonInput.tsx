import './AddonInput.css';

interface AddOnProps {
  prepend?: string;
  append?: string;
}
export default function AddonInput(props: AddOnProps) {
  const { prepend, append } = props;
  return (
    <div className="input-add-on">
      <AddonButton name={prepend} />
      <input type="text" className="input-add-on-field" />
      <AddonButton name={append} />
    </div>
  );
}

interface AddonButtonProps {
  name?: string;
  onClick?: () => void;
}
function AddonButton(props: AddonButtonProps) {
  const { name } = props;
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  if (name) {
    return (
      <button onClick={onClick} className="input-add-on-item">
        {name}
      </button>
    );
  }

  return null;
}
