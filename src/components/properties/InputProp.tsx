import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export type InputPropProps = {
  content: string;
  invalid?: boolean;
  onChange(value: string): void;
  onFocus?(): void;
};

export default function InputProp(props: InputPropProps) {
  const { content, invalid = false, onChange, onFocus } = props;

  function changeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    onChange(currentTarget.value);
  }

  return (
    <Input
      placeholder="font text"
      value={content}
      onChange={changeHandler}
      onFocus={onFocus}
      isInvalid={invalid}
      errorBorderColor="crimson"
    />
  );
}
