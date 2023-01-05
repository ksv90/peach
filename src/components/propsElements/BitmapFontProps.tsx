import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useElementsContext, useThemeContext } from '../../contexts';
import BitmapFontModal from '../BitmapFontModal';
import { ButtonProp } from '../properties';

interface Props {
  font: string;
}

export default function BitmapFontProps({ font }: Props) {
  const { mainColorHover } = useThemeContext();
  const { bitmapFonts, addBitmapText } = useElementsContext();
  const [bitmapFontModalOpen, setBitmapFontModalOpen] = useState(false);

  if (!bitmapFonts.includes(font)) throw new Error(`BitmapFont ${font} not found`);

  function bitmapFontModalHandler() {
    setBitmapFontModalOpen((prev: boolean) => !prev);
  }

  return (
    <>
      <Flex flexDirection="column" gap="5px">
        <ButtonProp content="create bitmapText" clickHandler={bitmapFontModalHandler} />
      </Flex>
      <BitmapFontModal
        bitmapFontNames={bitmapFonts}
        isOpen={bitmapFontModalOpen}
        onClose={bitmapFontModalHandler}
        itemClick={addBitmapText}
        colorHover={mainColorHover}
      />
    </>
  );
}
