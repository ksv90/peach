import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Properties {
  content: string;
  invalid?: boolean;
  onChange(event: ChangeEvent): void;
  onFocus?(): void;
}

export default function InputProp(props: Properties) {
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
