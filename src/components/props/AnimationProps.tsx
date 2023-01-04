import { Button, Flex } from '@chakra-ui/react';
import { useAppContext } from '../../contexts';

interface SkeletonItemProps {
  anim: string;
}

export default function AnimationProps({ anim }: SkeletonItemProps) {
  const { app, animationsList, setAnimationProps } = useAppContext();
  const spine = animationsList[anim];

  if (!spine) throw new Error(`Animation ${anim} not fuind`);
  console.log(spine);

  function playClichHandler() {
    if (!spine) return;
    app.stage.addChild(spine);
    const { width, height } = app.view;
    spine.position.set(width / 2, height / 2);
    spine.state.setAnimation(0, anim);
  }

  function stopClickHandler() {
    spine?.state.clearTracks();
  }

  function removeClickHandler() {
    delete animationsList[anim];
    setAnimationProps(null);
    spine?.destroy();
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <Button variant="custom" onClick={playClichHandler}>
        {'play animation'}
      </Button>
      <Button variant="custom" onClick={stopClickHandler}>
        {'stop animation'}
      </Button>
      <Button variant="custom" onClick={removeClickHandler}>
        {'remove animation'}
      </Button>
    </Flex>
  );
}
