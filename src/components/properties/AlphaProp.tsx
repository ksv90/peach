import SliderProp from './SliderProp';

interface AlphaPropProps {
  value: number;
  changeHandler(value: number): void;
}

export default function AlphaProp(props: AlphaPropProps) {
  const { value, changeHandler } = props;
  return (
    <SliderProp
      content="alpha value"
      value={value}
      sliderOptions={{ min: 0, max: 1, step: 0.01 }}
      changeHandler={changeHandler}
    />
  );
}
