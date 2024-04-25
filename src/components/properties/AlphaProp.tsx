import { NumberTitleProp } from '@peach/components';

export type AlphaPropProps = {
  value: number;
  onChange(value: number): void;
};

export default function AlphaProp(props: AlphaPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { value, onChange } = props;

  return <NumberTitleProp content="alpha:" value={value} min={0} max={1} step={0.01} onChange={onChange} slider />;
}
