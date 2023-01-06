import SliderProp from './SliderProp';

export type PositionPropProps = {
  axis: string;
  value: number;
  max: number;
  changeHandler(value: number): void;
};

export default function PositionProp(props: PositionPropProps) {
  const { axis, value, max, changeHandler } = props;
  return (
    <SliderProp
      content={`position ${axis}`}
      value={value}
      sliderOptions={{ max: max }}
      changeHandler={changeHandler}
    />
  );
}
