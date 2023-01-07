import { CalendarIcon, ChatIcon, EditIcon } from '@chakra-ui/icons';
import { Container } from '@chakra-ui/react';
import { useElementsContext } from '../contexts';
import PanelsTitel from './PanelsTitel';
import LayerItem from './LayerItem';

const ICON_OPTIONS = {
  boxSize: 6,
  flexBasis: '15%',
};

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
          icon={<CalendarIcon {...ICON_OPTIONS} />}
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
            icon={<ChatIcon {...ICON_OPTIONS} />}
          />
        );
      })}
      {Object.values(elementsContext.texts).map((text, index) => {
        const name = `${text.name}-${index + 1}`;
        return (
          <LayerItem
            key={name}
            name={name}
            showProps={() => setCurrentElement(text)}
            selected={currentElement === text}
            icon={<EditIcon {...ICON_OPTIONS} />}
          />
        );
      })}
    </Container>
  );
}
