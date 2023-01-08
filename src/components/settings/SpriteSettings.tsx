import { Flex } from '@chakra-ui/react';
import { Sprite } from 'pixi.js';
import { useEffect } from 'react';
import BaseSettings from './BaseSettings';

export type SpriteSettingsProps = {
  sprite: Sprite;
};

export default function SpriteSettings({ sprite }: SpriteSettingsProps) {
  useEffect(() => {
    //
  }, [sprite]);

  return (
    <Flex flexDirection="column" gap="5px">
      <BaseSettings element={sprite} />
    </Flex>
  );
}
