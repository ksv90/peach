import { Container, Text } from '@chakra-ui/react';
import { useAppContext, useThemeContext } from '../contexts';
import { AnimationItem } from './items';
import SkeletonItem from './items/SkeletonItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const { skeletonList, animationsList, setCurrentSkeleton, setCurrentAnimation } = useAppContext();

  function showSkeletonProps(name: string) {
    setCurrentAnimation(null);
    setCurrentSkeleton(name);
  }

  function showAnimationProps(anim: string) {
    setCurrentSkeleton(null);
    setCurrentAnimation(anim);
  }

  return (
    <Container>
      <Text
        paddingTop="10px"
        borderColor={textColor}
        borderStyle="solid"
        borderBottomWidth="1px"
        textTransform="uppercase"
        align="center"
        marginBottom="15px"
      >
        layers panel
      </Text>
      {Object.keys(skeletonList).map((name) => (
        <SkeletonItem key={name} name={name} showProps={showSkeletonProps} />
      ))}
      {Object.keys(animationsList).map((anim) => (
        <AnimationItem key={anim} anim={anim} showProps={showAnimationProps} />
      ))}
    </Container>
  );
}
