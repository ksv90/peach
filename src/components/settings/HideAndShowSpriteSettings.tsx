import { Flex } from '@chakra-ui/react';
import { Spine } from '@pixi-spine/runtime-4.1';
import { useEffect } from 'react';
import { ButtonProp } from '@peach/components';
import { Sprite } from 'pixi.js';

export type HideAndShowSpriteSettingsProps = {
  elements: { spine: Spine; sprite: Sprite; animationName: string };
};

export default function HideAndShowSpriteSettings({ elements }: HideAndShowSpriteSettingsProps) {
  const { animationName, spine, sprite } = elements;

  useEffect(() => {
    //
  }, [animationName, spine, sprite]);

  function playClichHandler() {
    sprite.visible = false;
    spine.visible = true;
    spine.state.setAnimation(0, spine.name);
    spine.state.addListener({
      complete: () => {
        sprite.visible = true;
        spine.visible = false;
      },
    });
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <ButtonProp content="play animation" clickHandler={playClichHandler} />
    </Flex>
  );
}
