import SliderProp from './SliderProp';

interface PositionPropProps {
  axis: string;
  value: number;
  max: number;
  changeHandler(value: number): void;
}

export default function PositionProp(props: PositionPropProps) {
  const { axis, value, max, changeHandler } = props;
  return (
    <SliderProp
      content={`position ${axis}`}
      defaultValue={value}
      value={value}
      step={1}
      changeHandler={changeHandler}
      max={max}
    />
  );
}
