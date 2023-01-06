import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useState } from 'react';
import { useElementsContext, useThemeContext } from '../../contexts';
import { AnimationsModal, BitmapFontModal } from '../modals';

export default function Add() {
  const { mainColor, mainColorHover, specialColorHover } = useThemeContext();
  const { skeletonList, addAnimation, bitmapFonts, addBitmapText } = useElementsContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);
  const [bitmapFontModalOpen, setBitmapFontModalOpen] = useState(false);

  function animationModalHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
  }

  function bitmapFontModalHandler() {
    setBitmapFontModalOpen((prev: boolean) => !prev);
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
      </MenuList>
      <AnimationsModal
        animationList={skeletonList}
        isOpen={animationModalOpen}
        onClose={animationModalHandler}
        itemClick={addAnimation}
        colorHover={mainColorHover}
      />
      <BitmapFontModal
        bitmapFontNames={bitmapFonts}
        isOpen={bitmapFontModalOpen}
        onClose={bitmapFontModalHandler}
        itemClick={addBitmapText}
        colorHover={mainColorHover}
      />
    </Menu>
  );
}
