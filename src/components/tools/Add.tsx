import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useThemeContext } from '../../contexts';

export default function Add() {
  const { mainColor, specialColor } = useThemeContext();
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
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          Animation
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          Text
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
