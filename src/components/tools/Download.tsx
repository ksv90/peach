import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useThemeContext } from '@peach/contexts';

export default function Download() {
  const { mainColor, specialColorHover } = useThemeContext();

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="custom"
        rightIcon={<ChevronDownIcon />}
        transition="all 0.2s"
        borderRadius="lg"
        textDecoration="line-through"
      >
        Download
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          Image
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          Spine
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          WebFont
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          BitmapFont
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
