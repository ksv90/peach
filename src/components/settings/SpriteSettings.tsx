import { Flex } from '@chakra-ui/react';
import { Sprite } from 'pixi.js';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts';
import { AlphaProp, PositionProp, ScaleProp } from '../properties';

export type SpriteSettingsProps = {
  sprite: Sprite;
};

export default function SpriteSettings({ sprite }: SpriteSettingsProps) {
  const { app } = useAppContext();
  const [alpha, setAlpha] = useState(sprite.alpha);
  const [scale, setScale] = useState(sprite.scale.x);
  const [x, setX] = useState(sprite.x);
  const [y, setY] = useState(sprite.y);

  useEffect(() => {
    setAlpha(sprite.alpha);
    setScale(sprite.scale.x);
    setX(sprite.x);
    setY(sprite.y);
  }, [sprite]);

  function alphaHandler(value: number) {
    setAlpha(value);
    sprite.alpha = value;
  }

  function scaleHandler(value: number) {
    setScale(value);
    sprite.scale.set(value);
  }

  function xHandler(value: number) {
    setX(value);
    sprite.x = value;
  }

  function yHandler(value: number) {
    setY(value);
    sprite.y = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <AlphaProp value={alpha} onChange={alphaHandler} />
      <ScaleProp value={scale} onChange={scaleHandler} />
      <PositionProp axis="x" value={x} max={app.screen.width} onChange={xHandler} />
      <PositionProp axis="y" value={y} max={app.screen.height} onChange={yHandler} />
    </Flex>
  );
}
