import { CalendarIcon, EditIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { useElementsContext } from '../contexts';
import PanelsTitel from './PanelsTitel';
import LayerItem from './LayerItem';

export default function LayersPanel() {
  const elementsContext = useElementsContext();
  const { currentElement, setCurrentElement } = elementsContext;
  return (
    <Container overflowY="scroll">
      <PanelsTitel>layers panel</PanelsTitel>
      {Object.entries(elementsContext.spineAnimations).map(([anim, spine]) => (
        <LayerItem
          key={anim}
          name={anim}
          showProps={() => setCurrentElement([anim, spine])}
          selected={Array.isArray(currentElement) && currentElement[1] === spine}
          icon={<CalendarIcon boxSize={6} flexBasis="15%" />}
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
            icon={<EditIcon boxSize={6} flexBasis="15%" />}
          />
        );
      })}
    </Container>
  );
}
