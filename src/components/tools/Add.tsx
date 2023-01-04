import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppContext, useThemeContext } from '../../contexts';
import AnimationsModal from '../AnimationsModal';

export default function Add() {
  const { mainColor, mainColorHover, specialColorHover } = useThemeContext();
  const { skeletonList, addAnimation } = useAppContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);

  function animationModalHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
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
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          Texture
        </MenuItem>
        <MenuItem onClick={animationModalHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
          Animation
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          Text
        </MenuItem>
      </MenuList>
      <AnimationsModal
        animationList={skeletonList}
        isOpen={animationModalOpen}
        onClose={animationModalHandler}
        itemClick={addAnimation}
        colorHover={mainColorHover}
      />
    </Menu>
  );
}
