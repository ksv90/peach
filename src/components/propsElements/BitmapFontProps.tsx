import { Flex } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
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
  const [content, setContent] = useState('');

  if (!bitmapFonts.includes(font)) throw new Error(`BitmapFont ${font} not found`);

  function createBitmaTextClichHandler() {
    setBitmapFontModalOpen((prev: boolean) => !prev);
  }

  function changeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    setContent(currentTarget.value);
  }

  return (
    <>
      <Flex flexDirection="column" gap="5px">
        <ButtonProp content="create bitmapText" clickHandler={createBitmaTextClichHandler} />
      </Flex>
      <BitmapFontModal
        bitmapFontNames={bitmapFonts}
        content={content}
        isOpen={bitmapFontModalOpen}
        onClose={createBitmaTextClichHandler}
        onChange={changeHandler}
        itemClick={addBitmapText}
        colorHover={mainColorHover}
      />
    </>
  );
}
