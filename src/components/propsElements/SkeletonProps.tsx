import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppContext, useThemeContext } from '../../contexts';
import AnimationsModal from '../AnimationsModal';
import { ButtonProp } from '../properties';

interface SkeletonItemProps {
  name: string;
}

export default function SkeletonProps({ name }: SkeletonItemProps) {
  const { mainColorHover } = useThemeContext();
  const { skeletonList, addAnimation, setSkeletonProps } = useAppContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);

  const skeleton = skeletonList[name];

  if (!skeleton) throw new Error(`Skeleton ${name} not found`);

  function createAnimationClichHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
  }

  function removeSkeletonClickHandler() {
    delete skeletonList[name];
    setSkeletonProps(null);
  }

  return (
    <>
      <Flex flexDirection="column" gap="5px">
        <Text>{`animations amount: ${skeleton.animations.length}`}</Text>
        <ButtonProp content="create animation" clickHandler={createAnimationClichHandler} />
        <ButtonProp content="remove skeleton" clickHandler={removeSkeletonClickHandler} />
      </Flex>
      <AnimationsModal
        animationList={{ [name]: skeleton }}
        isOpen={animationModalOpen}
        onClose={createAnimationClichHandler}
        itemClick={addAnimation}
        colorHover={mainColorHover}
      />
    </>
  );
}
