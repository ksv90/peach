import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useElementsContext, useThemeContext } from '../../contexts';
import { loadSpines } from '../../utils';

const devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function createSelectFile(): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  if (!devices.test(navigator.userAgent)) input.webkitdirectory = true;
  input.accept = 'application/json, image/png, image/jpeg, .atlas';
  input.multiple = true;
  return input;
}

export default function Download() {
  const { mainColor, specialColorHover } = useThemeContext();
  const { addSkeleton } = useElementsContext();

  function selectSpine({ target }: Event) {
    if (target instanceof HTMLInputElement) {
      loadSpines(target.files)
        .then((skeletons) => skeletons.forEach(([name, skeleton]) => addSkeleton([name, skeleton])))
        .catch((e) => new Error(`Spine not loaded ${e}`));
    }
  }

  function spineHandler() {
    const input = createSelectFile();
    input.addEventListener('change', selectSpine, { once: true });
    input.click();
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
        Download
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColorHover }}>
          Image
        </MenuItem>
        <MenuItem onClick={spineHandler} bg={mainColor} _hover={{ bg: specialColorHover }}>
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
