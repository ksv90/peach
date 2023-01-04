import { CalendarIcon, ViewIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '../contexts';
import LayerItem from './LayerItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const appContext = useElementsContext();
  const { currentSkeleton, currentAnimation, setSkeletonProps, setAnimationProps } = appContext;
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
        layers panel
      </Text>
      {Object.keys(appContext.skeletonList).map((name) => (
        <LayerItem
          key={name}
          name={name}
          showProps={setSkeletonProps}
          selected={currentSkeleton === name}
          Icon={ViewIcon}
        />
      ))}
      {Object.keys(appContext.animationsList).map((anim) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={setAnimationProps}
          selected={currentAnimation === anim}
          Icon={CalendarIcon}
        />
      ))}
    </Container>
  );
}
