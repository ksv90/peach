import { Flex } from '@chakra-ui/react';
import { BitmapText } from 'pixi.js';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AlphaProp, PositionProp, ScaleProp } from '../properties';
import InputProp from '../properties/InputProp';

interface BitmapTextSettingsProps {
  bitmapText: BitmapText;
}

export default function BitmapTextSettings({ bitmapText }: BitmapTextSettingsProps) {
  const { app } = useAppContext();
  const [text, setText] = useState(bitmapText.text);
  const [alpha, setAlpha] = useState(bitmapText.alpha);
  const [scale, setScale] = useState(bitmapText.scale.x);
  const [x, setX] = useState(bitmapText.x);
  const [y, setY] = useState(bitmapText.y);

  useEffect(() => {
    setText(bitmapText.text);
    setAlpha(bitmapText.alpha);
    setScale(bitmapText.scale.x);
    setX(bitmapText.x);
    setY(bitmapText.y);
  }, [bitmapText]);

  function textChangeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>): void {
    setText(currentTarget.value);
    bitmapText.text = currentTarget.value;
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
      <InputProp content={text} onChange={textChangeHandler} />
      <AlphaProp value={alpha} changeHandler={alphaHandler} />
      <ScaleProp value={scale} changeHandler={scaleHandler} />
      <PositionProp axis="x" value={x} max={app.screen.width} changeHandler={xHandler} />
      <PositionProp axis="y" value={y} max={app.screen.height} changeHandler={yHandler} />
    </Flex>
  );
}
