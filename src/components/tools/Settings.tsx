import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useThemeContext } from '../../contexts';

export default function Settings() {
  const { mainColor, specialColorHover } = useThemeContext();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="custom"
        transition="all 0.2s"
        borderRadius="lg"
      />
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }} icon={<AddIcon />} command="⌘T">
          New Tab
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<ExternalLinkIcon />}
          command="⌘N"
        >
          New Window
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<RepeatIcon />}
          command="⌘⇧N"
        >
          Open Closed Tab
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<EditIcon />}
          command="⌘O"
        >
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
