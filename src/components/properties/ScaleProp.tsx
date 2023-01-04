import SliderProp from './SliderProp';

interface ScalePropProps {
  value: number;
  changeHandler(value: number): void;
}

export default function ScaleProp(props: ScalePropProps) {
  const { value, changeHandler } = props;
  return (
    <SliderProp
      content="scale value"
      value={value}
      changeHandler={changeHandler}
      defaultValue={1}
      min={0}
      max={2}
      step={0.01}
    />
  );
}
