import { SliderProp } from '@peach/components';

export type PositionPropProps = {
  axis: string;
  value: number;
  max: number;
  onChange(value: number): void;
};

export default function PositionProp(props: PositionPropProps) {
  const { axis, value, max, onChange } = props;
  return (
    <SliderProp
      content={`position ${axis}`}
      value={value}
      sliderOptions={{ max: max }}
      onChange={onChange}
    />
  );
}
