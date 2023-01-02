import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useState } from 'react';
import { useThemeContext } from '../../contexts';
import AnimationsModal from '../AnimationsModal';

export default function Add() {
  const { mainColor, specialColor } = useThemeContext();
  const [animationModalOpen, setAnimationModalOpen] = useState(false);

  function animationHandler() {
    setAnimationModalOpen((prev: boolean) => !prev);
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="blue"
        rightIcon={<ChevronDownIcon />}
        transition="all 0.2s"
        borderRadius="lg"
      >
        Add to scene
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          Texture
        </MenuItem>
        <MenuItem onClick={animationHandler} bg={mainColor} _hover={{ bg: specialColor }}>
          Animation
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          Text
        </MenuItem>
      </MenuList>
      <AnimationsModal isOpen={animationModalOpen} onClose={animationHandler} />
    </Menu>
  );
}
