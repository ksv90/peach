import { CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/react';
import { useAppContext, useThemeContext } from '../contexts';
import LayerItem from './LayerItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const appContext = useAppContext();
  const { currentSkeleton, currentAnimation, showSkeletonProps, showAnimationProps } = appContext;
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
      {Object.keys(appContext.skeletonList).map((name) => (
        <LayerItem
          key={name}
          name={name}
          showProps={showSkeletonProps}
          selected={currentSkeleton === name}
          Icon={ViewIcon}
        />
      ))}
      {Object.keys(appContext.animationsList).map((anim) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={showAnimationProps}
          selected={currentAnimation === anim}
          Icon={CalendarIcon}
        />
      ))}
    </Container>
  );
}
