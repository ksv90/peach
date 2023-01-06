import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import { Container, Text } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '../contexts';
import LayerItem from './LayerItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const elementsContext = useElementsContext();
  const { currentElement, setCurrentElement } = elementsContext;
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
      {Object.entries(elementsContext.animationsList).map(([anim, spine]) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={() => setCurrentElement([anim, spine])}
          selected={Array.isArray(currentElement) && currentElement[1] === spine}
          Icon={CalendarIcon}
        />
      ))}
      {Object.values(elementsContext.bitmapTexts).map((bitmapText, index) => {
        const name = `${bitmapText.fontName}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(bitmapText)}
            selected={currentElement === bitmapText}
            Icon={EditIcon}
          />
        );
      })}
    </Container>
  );
}
