import { Flex } from '@chakra-ui/react';
import { Spine } from '@pixi-spine/runtime-4.1';
import { useEffect, useState } from 'react';
import { useAppContext, useElementsContext } from '../../contexts';
import { AlphaProp, ButtonProp, PositionProp, ScaleProp } from '../properties';

export type AnimationSettingsProps = {
  spine: Spine;
};

export default function AnimationSettings({ spine }: AnimationSettingsProps) {
  const { app } = useAppContext();
  const { spineAnimations, setCurrentElement } = useElementsContext();
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
    spine.state.setAnimation(0, spine.name);
  }

  function loopClichHandler() {
    spine.state.setAnimation(0, spine.name, true);
  }

  function stopClickHandler() {
    spine.state.clearTracks();
  }

  function removeClickHandler() {
    delete spineAnimations[spine.name]; // TODO: перенести удаление в редюсер
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
      <AlphaProp value={alpha} onChange={alphaHandler} />
      <ScaleProp value={scale} onChange={scaleHandler} />
      <PositionProp axis="x" value={x} max={width} onChange={xHandler} />
      <PositionProp axis="y" value={y} max={height} onChange={yHandler} />
    </Flex>
  );
}
