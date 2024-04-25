import { NumberTitleProp } from '@peach/components';

export type PositionPropProps = {
  axis: string;
  value: number;
  max: number;
  onChange(value: number): void;
};

export default function PositionProp(props: PositionPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { axis, value, max, onChange } = props;

  return (
    <NumberTitleProp
      content={`position ${axis}:`}
      value={value}
      min={0}
      max={max}
      onChange={onChange}
      maxW={150}
      input
      slider
    />
  );
}
