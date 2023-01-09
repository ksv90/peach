import { NumberTitleProp } from '@peach/components';

export type FontSizePropProps = {
  value: number;
  onChange(value: number): void;
};

export default function FontSizeProp(props: FontSizePropProps) {
  const { value, onChange } = props;
  return (
    <NumberTitleProp
      content="font size:"
      value={value}
      min={1}
      max={500}
      onChange={onChange}
      maxW={100}
      slider
    />
  );
}
