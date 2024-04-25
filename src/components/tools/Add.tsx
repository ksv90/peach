import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BitmapFontsModal, SkeletonsModal, TexturesModal,WebFontsModal } from '@peach/components';
import { useElementsContext, useThemeContext } from '@peach/contexts';
import { useState } from 'react';

export default function Add() {
  const { mainColor, mainColorHover, specialColorHover } = useThemeContext();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { addAnimation, addSprite, addBitmapText, addText } = useElementsContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);
  const [bitmapFontModalOpen, setBitmapFontModalOpen] = useState(false);
  const [webFontModalOpen, setWebFontModalOpen] = useState(false);
  const [textureModalOpen, setTextureModalOpen] = useState(false);

  function animationModalHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
  }

  function bitmapFontModalHandler() {
    setBitmapFontModalOpen((prev: boolean) => !prev);
  }

  function webFontModalHandler() {
    setWebFontModalOpen((prev: boolean) => !prev);
  }

  function textureModalHandler() {
    setTextureModalOpen((prev: boolean) => !prev);
  }

  return (
    <Menu>
      <MenuButton as={Button} variant="custom" rightIcon={<ChevronDownIcon />} transition="all 0.2s" borderRadius="lg">
        Add to scene
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem onClick={textureModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Texture
        </MenuItem>
        <MenuItem onClick={animationModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Animation
        </MenuItem>
        <MenuItem onClick={bitmapFontModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          BitmapText
        </MenuItem>
        <MenuItem onClick={webFontModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Text
        </MenuItem>
      </MenuList>
      <SkeletonsModal
        isOpen={animationModalOpen}
        onClose={animationModalHandler}
        itemClick={addAnimation}
        colorHover={mainColorHover}
      />
      <BitmapFontsModal
        isOpen={bitmapFontModalOpen}
        onClose={bitmapFontModalHandler}
        itemClick={addBitmapText}
        colorHover={mainColorHover}
      />
      <WebFontsModal
        isOpen={webFontModalOpen}
        onClose={webFontModalHandler}
        itemClick={addText}
        colorHover={mainColorHover}
      />
      <TexturesModal
        isOpen={textureModalOpen}
        onClose={textureModalHandler}
        itemClick={addSprite}
        colorHover={mainColorHover}
      />
    </Menu>
  );
}
