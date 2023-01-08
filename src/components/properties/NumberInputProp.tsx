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
  onChange(value: number): void;
};

export default function NumberInputProp(props: NumberInputPropProps) {
  const { value, min, onChange } = props;

  function changeHandler(_: unknown, value: number) {
    onChange(value);
  }

  return (
    <NumberInput value={value} onChange={changeHandler} min={min}>
      <NumberInputField></NumberInputField>
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
