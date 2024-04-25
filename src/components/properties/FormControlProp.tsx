import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

export type FormControlPropProps = {
  readonly content: string;
  readonly header: string;
  readonly isRequired?: boolean;
  readonly invalid?: boolean;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
  onChange(value: string): void;
  onFocus?(): void;
};

export default function FormControlProp(props: FormControlPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { content, header, isRequired, invalid, helperMessage, errorMessage, onChange, onFocus } = props;

  function changeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    onChange(currentTarget.value);
  }

  const helperText = <FormHelperText>{helperMessage}</FormHelperText>;
  const errorText = <FormErrorMessage>{errorMessage}</FormErrorMessage>;

  return (
    <FormControl isInvalid={invalid} isRequired={isRequired} padding="10px 0">
      <FormLabel>{header}</FormLabel>
      <Input placeholder="enter text" value={content} onChange={changeHandler} onFocus={onFocus} />
      {!invalid ? helperText : errorText}
    </FormControl>
  );
}
