import { NumberTitleProp } from '@peach/components';

export type ZIndexPropProps = {
  value: number;
  onChange(value: number): void;
};

export default function ZIndexProp(props: ZIndexPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { value, onChange } = props;
  return <NumberTitleProp content="zIndex:" value={value} min={0} max={10000} onChange={onChange} maxW={100} input />;
}
