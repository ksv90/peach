import SliderProp from './SliderProp';

export type ScalePropProps = {
  value: number;
  onChange(value: number): void;
};

export default function ScaleProp(props: ScalePropProps) {
  const { value, onChange } = props;
  return (
    <SliderProp
      content="scale value"
      value={value}
      sliderOptions={{ max: 2, step: 0.01 }}
      onChange={onChange}
    />
  );
}
