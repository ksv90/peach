import { Button, Flex } from '@chakra-ui/react';
import { useAppContext } from '../contexts';

interface SkeletonItemProps {
  anim: string;
}

export default function AnimationProps({ anim }: SkeletonItemProps) {
  const { animationsList, app } = useAppContext();
  const spine = animationsList[anim];
  function clickHandler() {
    if (!spine) return;
    app.stage.addChild(spine);
    const { width, height } = app.view;
    spine.position.set(width / 2, height / 2);
    spine.state.setAnimation(0, anim);
  }
  return (
    <Flex flexDirection="column">
      <Button colorScheme="blue" onClick={clickHandler}>
        {'play animation'}
      </Button>
    </Flex>
  );
}
