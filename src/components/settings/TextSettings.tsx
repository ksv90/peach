import { Flex } from '@chakra-ui/react';
import { Text } from 'pixi.js';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts';
import { AlphaProp, InputProp, PositionProp, ScaleProp } from '../properties';

export type TextSettingsProps = {
  text: Text;
};

export default function TextSettings({ text }: TextSettingsProps) {
  const { app } = useAppContext();
  const [content, setContent] = useState(text.text);
  const [alpha, setAlpha] = useState(text.alpha);
  const [scale, setScale] = useState(text.scale.x);
  const [x, setX] = useState(text.x);
  const [y, setY] = useState(text.y);

  useEffect(() => {
    setContent(text.text);
    setAlpha(text.alpha);
    setScale(text.scale.x);
    setX(text.x);
    setY(text.y);
  }, [text]);

  function contentHandler(value: string): void {
    setContent(value);
    text.text = value;
  }

  function alphaHandler(value: number) {
    setAlpha(value);
    text.alpha = value;
  }

  function scaleHandler(value: number) {
    setScale(value);
    text.scale.set(value);
  }

  function xHandler(value: number) {
    setX(value);
    text.x = value;
  }

  function yHandler(value: number) {
    setY(value);
    text.y = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <InputProp content={content} onChange={contentHandler} />
      <AlphaProp value={alpha} onChange={alphaHandler} />
      <ScaleProp value={scale} onChange={scaleHandler} />
      <PositionProp axis="x" value={x} max={app.screen.width} onChange={xHandler} />
      <PositionProp axis="y" value={y} max={app.screen.height} onChange={yHandler} />
    </Flex>
  );
}
