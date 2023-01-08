import { Container } from '@chakra-ui/react';
import { CurrentElementPayload, useElementsContext } from '@peach/contexts';
import { Spine } from '@pixi-spine/runtime-4.1';
import { BitmapText, Sprite, Text } from 'pixi.js';
import {
  AnimationSettings,
  BitmapTextSettings,
  TextSettings,
  SpriteSettings,
  PanelsTitel,
} from '@peach/components';

function getSettingsСomponent(element: CurrentElementPayload) {
  if (element instanceof BitmapText) return <BitmapTextSettings bitmapText={element} />;
  if (element instanceof Text) return <TextSettings text={element} />;
  if (element instanceof Sprite) return <SpriteSettings sprite={element} />;
  if (element instanceof Spine) return <AnimationSettings spine={element} />;
  return <></>;
}

export default function PropertiesPanel() {
  const { currentElement } = useElementsContext();

  return (
    <Container overflowY="scroll">
      <PanelsTitel>props panel</PanelsTitel>
      {getSettingsСomponent(currentElement)}
    </Container>
  );
}
