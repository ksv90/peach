import { Container, Text } from '@chakra-ui/react';
import { Spine } from '@pixi-spine/runtime-4.1';
import { BitmapText } from 'pixi.js';
import { useElementsContext, useThemeContext } from '../contexts';
import { CurrentElementPayload } from '../contexts/ElementsContext/types';
import { AnimationSettings, BitmapTextSettings } from './settings';

function getElement(element: CurrentElementPayload) {
  if (element instanceof BitmapText) return <BitmapTextSettings bitmapText={element} />;
  if (Array.isArray(element)) {
    const [first, second] = element;
    if (second instanceof Spine) return <AnimationSettings anim={first} spine={second} />;
  }
  return <></>;
}

export default function PropsPanel() {
  const { textColor } = useThemeContext();
  const { currentElement } = useElementsContext();

  return (
    <Container overflowY="scroll">
      <Text
        paddingTop="10px"
        borderColor={textColor}
        borderBottomWidth="1px"
        textTransform="uppercase"
        align="center"
        marginBottom="15px"
      >
        props panel
      </Text>
      {getElement(currentElement)}
    </Container>
  );
}
