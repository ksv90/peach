import { Button } from '@chakra-ui/react';

export type ButtonPropProps = {
  content: string;
  clickHandler(): void;
};

export default function ButtonProp(props: ButtonPropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { content, clickHandler } = props;
  return (
    <Button variant="custom" onClick={clickHandler} whiteSpace="normal">
      {content}
    </Button>
  );
}
