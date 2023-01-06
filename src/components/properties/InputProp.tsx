import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export type InputPropProps = {
  content: string;
  invalid?: boolean;
  onChange(event: ChangeEvent): void;
  onFocus?(): void;
};

export default function InputProp(props: InputPropProps) {
  const { content, invalid = false, onChange, onFocus } = props;

  return (
    <Input
      placeholder="Basic usage"
      value={content}
      onChange={onChange}
      onFocus={onFocus}
      isInvalid={invalid}
      errorBorderColor="crimson"
    />
  );
}
