interface HeadWithSubTitleProps {
  title: string;
  children: any;
}
export default function HeadWithSubTitle(props: HeadWithSubTitleProps) {
  return (
    <h1 className="relative bg-gray-400 leading-loose text-lg mb-2">
      {props.children}
      <span className="text-gray-200 absolute text-sm top-0">
        {props.title}
      </span>
    </h1>
  );
}
