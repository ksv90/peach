import { Flex } from '@chakra-ui/react';
import { DisplayObject } from 'pixi.js';
import { useEffect, useState } from 'react';
import { useAppContext } from '@peach/contexts';
import { AlphaProp, PositionProp, ScaleProp, ZIndexProp } from '@peach/components';

export type BaseSettingsProps = {
  element: DisplayObject;
};

export default function BaseSettings({ element }: BaseSettingsProps) {
  const { app } = useAppContext();
  const [alpha, setAlpha] = useState(element.alpha);
  const [scale, setScale] = useState(element.scale.x);
  const [x, setX] = useState(element.x);
  const [y, setY] = useState(element.y);
  const [zIndex, setZIndex] = useState(element.zIndex);

  useEffect(() => {
    setAlpha(element.alpha);
    setScale(element.scale.x);
    setX(element.x);
    setY(element.y);
    setZIndex(element.zIndex);
  }, [element]);

  function alphaHandler(value: number) {
    setAlpha(value);
    element.alpha = value;
  }

  function scaleHandler(value: number) {
    setScale(value);
    element.scale.set(value);
  }

  function xHandler(value: number) {
    setX(value);
    element.x = value;
  }

  function yHandler(value: number) {
    setY(value);
    element.y = value;
  }

  function zIndexHandler(value: number) {
    setZIndex(value);
    element.zIndex = value;
    app.render();
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <AlphaProp value={alpha} onChange={alphaHandler} />
      <ScaleProp value={scale} onChange={scaleHandler} />
      <ZIndexProp value={zIndex} onChange={zIndexHandler} />
      <PositionProp axis="x" value={x} max={app.screen.width} onChange={xHandler} />
      <PositionProp axis="y" value={y} max={app.screen.height} onChange={yHandler} />
    </Flex>
  );
}
