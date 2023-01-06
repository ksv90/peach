import { Container } from '@chakra-ui/react';
import { Spine } from '@pixi-spine/runtime-4.1';
import { BitmapText } from 'pixi.js';
import { CurrentElementPayload, useElementsContext } from '../contexts';
import PanelsTitel from './PanelsTitel';
import { AnimationSettings, BitmapTextSettings } from './settings';

function getSettingsСomponent(element: CurrentElementPayload) {
  if (element instanceof BitmapText) return <BitmapTextSettings bitmapText={element} />;
  if (Array.isArray(element)) {
    const [first, second] = element;
    if (second instanceof Spine) return <AnimationSettings anim={first} spine={second} />;
  }
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
