import { CalendarIcon, ChatIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '../contexts';
import LayerItem from './LayerItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const elementsContext = useElementsContext();
  const {
    currentSkeleton,
    currentAnimation,
    currentBitmapFont,
    currentBitmapText,
    setSkeletonProps,
    setAnimationProps,
    setBitmapFontProps,
    setBitmapTextProps,
  } = elementsContext;
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
      {Object.keys(elementsContext.skeletonList).map((name) => (
        <LayerItem
          key={name}
          name={name}
          showProps={setSkeletonProps}
          selected={currentSkeleton === name}
          Icon={ViewIcon}
        />
      ))}
      {Object.keys(elementsContext.animationsList).map((anim) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={setAnimationProps}
          selected={currentAnimation === anim}
          Icon={CalendarIcon}
        />
      ))}
      {Object.values(elementsContext.bitmapFonts).map((name) => (
        <LayerItem
          key={name}
          name={name}
          showProps={setBitmapFontProps}
          selected={currentBitmapFont === name}
          Icon={ChatIcon}
        />
      ))}
      {Object.values(elementsContext.bitmapTexts).map((bitmapText, index) => {
        const name = `${bitmapText.fontName}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setBitmapTextProps(bitmapText)}
            selected={currentBitmapText === bitmapText}
            Icon={EditIcon}
          />
        );
      })}
    </Container>
  );
}
