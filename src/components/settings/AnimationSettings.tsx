import { Flex } from '@chakra-ui/react';
import { Spine } from '@pixi-spine/runtime-4.1';
import { useEffect, useState } from 'react';
import { useElementsContext } from '../../contexts';
import { useAppContext } from '../../contexts/AppContext';
import { AlphaProp, ButtonProp, PositionProp, ScaleProp } from '../properties';

interface AnimationSettingsProps {
  anim: string;
  spine: Spine;
}

export default function AnimationSettings({ anim, spine }: AnimationSettingsProps) {
  const { app } = useAppContext();
  const { animationsList, setCurrentElement } = useElementsContext();
  const { width, height } = app.view;

  const [alpha, setAlpha] = useState(spine.alpha);
  const [scale, setScale] = useState(spine.scale.x);
  const [x, setX] = useState(spine.x);
  const [y, setY] = useState(spine.y);

  useEffect(() => {
    setAlpha(spine.alpha);
    setScale(spine.scale.x);
    setX(spine.x);
    setY(spine.y);
  }, [spine]);

  function alphaHandler(value: number) {
    setAlpha(value);
    spine.alpha = value;
  }

  function scaleHandler(value: number) {
    setScale(value);
    spine.scale.set(value);
  }

  function xHandler(value: number) {
    setX(value);
    spine.x = value;
  }

  function yHandler(value: number) {
    setY(value);
    spine.y = value;
  }

  function playClichHandler() {
    spine.state.setAnimation(0, anim);
  }

  function loopClichHandler() {
    spine.state.setAnimation(0, anim, true);
  }

  function stopClickHandler() {
    spine.state.clearTracks();
  }

  function removeClickHandler() {
    delete animationsList[anim];
    setCurrentElement(null);
    app.stage.removeChild(spine);
    spine.destroy();
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <Flex gap="5px">
        <ButtonProp content="play animation" clickHandler={playClichHandler} />
        <ButtonProp content="loop animation" clickHandler={loopClichHandler} />
      </Flex>
      <ButtonProp content="stop animation" clickHandler={stopClickHandler} />
      <ButtonProp content="remove animation" clickHandler={removeClickHandler} />
      <AlphaProp value={alpha} changeHandler={alphaHandler} />
      <ScaleProp value={scale} changeHandler={scaleHandler} />
      <PositionProp axis="x" value={x} max={width} changeHandler={xHandler} />
      <PositionProp axis="y" value={y} max={height} changeHandler={yHandler} />
    </Flex>
  );
}
