import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '@peach/contexts';
import { HideAndShowTextureModal } from '@peach/components';
import { useState } from 'react';

export default function Script() {
  const { mainColor, mainColorHover, specialColorHover } = useThemeContext();
  const { addHideAndShowTextureScript } = useElementsContext();
  const [hideAndShowTextureModalOpen, setHideAndShowTextureModalOpen] = useState(false);

  function hideAndShowTextureModalHandler() {
    setHideAndShowTextureModalOpen((prev: boolean) => !prev);
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
        Script
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          onClick={hideAndShowTextureModalHandler}
        >
          Hide and show sprite
        </MenuItem>
      </MenuList>
      <HideAndShowTextureModal
        isOpen={hideAndShowTextureModalOpen}
        onClose={hideAndShowTextureModalHandler}
        itemClick={addHideAndShowTextureScript}
        colorHover={mainColorHover}
      />
    </Menu>
  );
}
