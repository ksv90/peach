import { Flex } from '@chakra-ui/react';
import { BitmapText } from 'pixi.js';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts';
import { AlphaProp, InputProp, PositionProp, ScaleProp } from '../properties';

export type BitmapTextSettingsProps = {
  bitmapText: BitmapText;
};

export default function BitmapTextSettings({ bitmapText }: BitmapTextSettingsProps) {
  const { app } = useAppContext();
  const [content, setContent] = useState(bitmapText.text);
  const [alpha, setAlpha] = useState(bitmapText.alpha);
  const [scale, setScale] = useState(bitmapText.scale.x);
  const [x, setX] = useState(bitmapText.x);
  const [y, setY] = useState(bitmapText.y);

  useEffect(() => {
    setContent(bitmapText.text);
    setAlpha(bitmapText.alpha);
    setScale(bitmapText.scale.x);
    setX(bitmapText.x);
    setY(bitmapText.y);
  }, [bitmapText]);

  function contentHandler(value: string): void {
    setContent(value);
    bitmapText.text = value;
  }

  function alphaHandler(value: number) {
    setAlpha(value);
    bitmapText.alpha = value;
  }

  function scaleHandler(value: number) {
    setScale(value);
    bitmapText.scale.set(value);
  }

  function xHandler(value: number) {
    setX(value);
    bitmapText.x = value;
  }

  function yHandler(value: number) {
    setY(value);
    bitmapText.y = value;
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
