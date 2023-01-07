import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useState } from 'react';
import { useElementsContext, useThemeContext } from '../../contexts';
import { SpinesModal, BitmapFontsModal, WebFontsModal } from '../modals';

export default function Add() {
  const { mainColor, mainColorHover, specialColorHover } = useThemeContext();
  const { skeletons, bitmapFonts, webFonts, addAnimation, addBitmapText, addText } =
    useElementsContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);
  const [bitmapFontModalOpen, setBitmapFontModalOpen] = useState(false);
  const [webFontModalOpen, setWebFontModalOpen] = useState(false);

  function animationModalHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
  }

  function bitmapFontModalHandler() {
    setBitmapFontModalOpen((prev: boolean) => !prev);
  }

  function webFontModalHandler() {
    setWebFontModalOpen((prev: boolean) => !prev);
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="custom"
        rightIcon={<ChevronDownIcon />}
        transition="all 0.2s"
        borderRadius="lg"
      >
        Add to scene
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }} textDecoration="line-through">
          Texture
        </MenuItem>
        <MenuItem onClick={animationModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Animation
        </MenuItem>
        <MenuItem
          onClick={bitmapFontModalHandler}
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
        >
          BitmapText
        </MenuItem>
        <MenuItem onClick={webFontModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Text
        </MenuItem>
      </MenuList>
      <SpinesModal
        skeletons={skeletons}
        isOpen={animationModalOpen}
        onClose={animationModalHandler}
        itemClick={addAnimation}
        colorHover={mainColorHover}
      />
      <BitmapFontsModal
        bitmapFonts={bitmapFonts}
        isOpen={bitmapFontModalOpen}
        onClose={bitmapFontModalHandler}
        itemClick={addBitmapText}
        colorHover={mainColorHover}
      />
      <WebFontsModal
        webFonts={webFonts}
        isOpen={webFontModalOpen}
        onClose={webFontModalHandler}
        itemClick={addText}
        colorHover={mainColorHover}
      />
    </Menu>
  );
}
