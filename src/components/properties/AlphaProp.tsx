import { SliderProp } from '@peach/components';

export type AlphaPropProps = {
  value: number;
  onChange(value: number): void;
};

export default function AlphaProp(props: AlphaPropProps) {
  const { value, onChange } = props;
  return (
    <SliderProp
      content="alpha value"
      value={value}
      sliderOptions={{ min: 0, max: 1, step: 0.01 }}
      onChange={onChange}
    />
  );
}
