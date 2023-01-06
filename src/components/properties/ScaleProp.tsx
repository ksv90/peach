import SliderProp from './SliderProp';

export type ScalePropProps = {
  value: number;
  changeHandler(value: number): void;
};

export default function ScaleProp(props: ScalePropProps) {
  const { value, changeHandler } = props;
  return (
    <SliderProp
      content="scale value"
      value={value}
      sliderOptions={{ max: 2, step: 0.01 }}
      changeHandler={changeHandler}
    />
  );
}
