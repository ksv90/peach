import { Flex } from '@chakra-ui/react';
import { BitmapText } from 'pixi.js';
import { ChangeEvent, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { AlphaProp, PositionProp, ScaleProp } from '../properties';
import InputProp from '../properties/InputProp';

interface Props {
  bitmapText: BitmapText;
}

export default function BitmapTextProps({ bitmapText }: Props) {
  const { app } = useAppContext();
  const { width, height } = app.view;

  const [content, setContent] = useState(bitmapText.text);
  const [alphaValue, setAlphaValue] = useState(1);
  const [scaleValue, setScaleValue] = useState(1);
  const [positionX, setpositionX] = useState(width / 2);
  const [positionY, setpositionY] = useState(height / 2);

  function contentChangeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>): void {
    if (!currentTarget.value) return;
    setContent(currentTarget.value);
    bitmapText.text = currentTarget.value;
  }

  function alphaChangedHandler(value: number) {
    setAlphaValue(value);
    bitmapText.alpha = value;
  }

  function scaleChangedHandler(value: number) {
    setScaleValue(value);
    bitmapText.scale.set(value);
  }

  function positionXHandler(value: number) {
    setpositionX(value);
    bitmapText.x = value;
  }

  function positionYHandler(value: number) {
    setpositionY(value);
    bitmapText.y = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <InputProp content={content} onChange={contentChangeHandler} />
      <AlphaProp value={alphaValue} changeHandler={alphaChangedHandler} />
      <ScaleProp value={scaleValue} changeHandler={scaleChangedHandler} />
      <PositionProp axis="x" value={positionX} max={width} changeHandler={positionXHandler} />
      <PositionProp axis="y" value={positionY} max={height} changeHandler={positionYHandler} />
    </Flex>
  );
}
