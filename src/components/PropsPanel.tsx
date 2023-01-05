import { Container, Text } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '../contexts';
import AnimationProps from './propsElements/AnimationProps';
import BitmapFontProps from './propsElements/BitmapFontProps';
import BitmapTextProps from './propsElements/BitmapTextProps';
import SkeletonProps from './propsElements/SkeletonProps';

export default function PropsPanel() {
  const { textColor } = useThemeContext();
  const { currentSkeleton, currentAnimation, currentBitmapFont, currentBitmapText } =
    useElementsContext();
  return (
    <Container overflowY="scroll">
      <Text
        paddingTop="10px"
        borderColor={textColor}
        borderBottomWidth="1px"
        textTransform="uppercase"
        align="center"
        marginBottom="15px"
      >
        props panel
      </Text>
      {currentSkeleton && <SkeletonProps name={currentSkeleton} />}
      {currentAnimation && <AnimationProps anim={currentAnimation} />}
      {currentBitmapFont && <BitmapFontProps font={currentBitmapFont} />}
      {currentBitmapText && <BitmapTextProps bitmapText={currentBitmapText} />}
    </Container>
  );
}
