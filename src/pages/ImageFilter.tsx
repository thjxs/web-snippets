import ImgFilter from '../components/ImgFilter';

const filters = [
  {
    role: 'blur',
    values: ['0', '4px', '8px'],
  },
  {
    role: 'brightness',
    values: ['0', '50%', '1', '200%'],
  },
  {
    role: 'contrast',
    values: ['0', '56%', '1', '200%'],
  },
  {
    role: 'dropShadow',
    values: ['30px 10px 4px #ccc', '0 -6mm 4mm rgb(23, 43, 33)'],
  },
  {
    role: 'grayscale',
    values: ['0', '.7', '1'],
  },
  {
    role: 'hue-rotate',
    values: ['0', '90deg', '-0.25turn', '3.14rad'],
  },
  {
    role: 'invert',
    values: ['0', '0.3', '50%', '70%', '1'],
  },
  {
    role: 'opacity',
    values: ['1', '70%', '50%', '0.2', '0'],
  },
  {
    role: 'saturate',
    values: ['1', '4', '50%', '0'],
  },
  {
    role: 'sepia',
    values: ['0', '0.2', '60%', '1'],
  },
];

export default function ImageFilter() {
  return (
    <div className="flex">
      {filters.map((f) => (
        <ImgFilter key={f.role} role={f.role} values={f.values} />
      ))}
    </div>
  );
}
