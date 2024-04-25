import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';

export type NumberInputPropProps = {
  value: number;
  min?: number;
  max?: number;
  maxW?: number;
  step?: number;
  onChange(value: number): void;
};

export default function NumberInputProp(props: NumberInputPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { value, min, max, step, onChange, maxW } = props;

  function changeHandler(_: unknown, value: number) {
    onChange(value);
  }

  return (
    <NumberInput maxW={maxW} value={value} onChange={changeHandler} min={min} max={max} step={step}>
      <NumberInputField></NumberInputField>
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
