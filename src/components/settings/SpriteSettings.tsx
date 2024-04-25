import { Flex } from '@chakra-ui/react';
import { BaseSettings } from '@peach/components';
import { Sprite } from 'pixi.js';
import { useEffect } from 'react';

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
