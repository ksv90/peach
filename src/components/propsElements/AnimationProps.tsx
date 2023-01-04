import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppContext } from '../../contexts';
import { AlphaProp, ButtonProp, PositionProp, ScaleProp } from '../properties';

interface SkeletonItemProps {
  anim: string;
}

export default function AnimationProps({ anim }: SkeletonItemProps) {
  const { app, animationsList, setAnimationProps } = useAppContext();
  const { width, height } = app.view;

  const [alphaValue, setAlphaValue] = useState(1);
  const [scaleValue, setScaleValue] = useState(1);
  const [positionX, setpositionX] = useState(width / 2);
  const [positionY, setpositionY] = useState(height / 2);

  const spine = animationsList[anim];

  if (!spine) throw new Error(`Animation ${anim} not fuind`);

  function playClichHandler() {
    if (!spine) return;
    app.stage.addChild(spine);
    spine.position.set(positionX, positionY);
    spine.state.setAnimation(0, anim);
  }

  function loopClichHandler() {
    if (!spine) return;
    app.stage.addChild(spine);
    spine.position.set(positionX, positionY);
    spine.state.setAnimation(0, anim, true);
  }

  function stopClickHandler() {
    spine?.state.clearTracks();
  }

  function removeClickHandler() {
    delete animationsList[anim];
    setAnimationProps(null);
    spine?.destroy();
  }

  function alphaChangedHandler(value: number) {
    if (!spine) return;
    setAlphaValue(value);
    spine.alpha = value;
  }

  function scaleChangedHandler(value: number) {
    setScaleValue(value);
    spine?.scale.set(value);
  }

  function positionXHandler(value: number) {
    if (!spine) return;
    setpositionX(value);
    spine.x = value;
  }

  function positionYHandler(value: number) {
    if (!spine) return;
    setpositionY(value);
    spine.y = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <Flex gap="5px">
        <ButtonProp content="play animation" clickHandler={playClichHandler} />
        <ButtonProp content="loop animation" clickHandler={loopClichHandler} />
      </Flex>
      <ButtonProp content="stop animation" clickHandler={stopClickHandler} />
      <ButtonProp content="remove animation" clickHandler={removeClickHandler} />
      <AlphaProp value={alphaValue} changeHandler={alphaChangedHandler} />
      <ScaleProp value={scaleValue} changeHandler={scaleChangedHandler} />
      <PositionProp axis="x" value={positionX} max={width} changeHandler={positionXHandler} />
      <PositionProp axis="y" value={positionY} max={height} changeHandler={positionYHandler} />
    </Flex>
  );
}
