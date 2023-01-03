import { Container, Text } from '@chakra-ui/react';
import { useAppContext, useThemeContext } from '../contexts';
import AnimationProps from './props/AnimationProps';
import SkeletonProps from './props/SkeletonProps';

export default function PropsPanel() {
  const { textColor } = useThemeContext();
  const { currentSkeleton, currentAnimation } = useAppContext();
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
        props panel
      </Text>
      {currentSkeleton && <SkeletonProps name={currentSkeleton} />}
      {currentAnimation && <AnimationProps anim={currentAnimation} />}
    </Container>
  );
}
