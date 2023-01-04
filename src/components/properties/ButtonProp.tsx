import { Button } from '@chakra-ui/react';

interface ButtonPropProps {
  content: string;
  clickHandler(): void;
}

export default function ButtonProp(props: ButtonPropProps) {
  const { content, clickHandler } = props;
  return (
    <Button variant="custom" onClick={clickHandler} whiteSpace="normal">
      {content}
    </Button>
  );
}
