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
      changeHandler={changeHandler}
      defaultValue={1}
      min={0}
      max={1}
      step={0.01}
    />
  );
}
