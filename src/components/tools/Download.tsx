import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAppContext, useThemeContext } from '../../contexts';
import { loadSpines } from '../../utils';

function createSelectFile(): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.webkitdirectory = true;
  input.accept = 'application/json, image/png, image/jpeg, .atlas';
  input.multiple = true;
  return input;
}

export default function Download() {
  const { mainColor, specialColor } = useThemeContext();
  const { setSkeleton } = useAppContext();

  function selectSpine({ target }: Event) {
    if (target instanceof HTMLInputElement) {
      loadSpines(target.files)
        .then((skeletons) => {
          skeletons.forEach(([name, skeleton]) => setSkeleton([name, skeleton]));
        })
        .catch((e) => {
          new Error(`Spine not loaded ${e}`);
        });
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
        colorScheme="blue"
        rightIcon={<ChevronDownIcon />}
        transition="all 0.2s"
        borderRadius="lg"
      >
        Download
      </MenuButton>
      <MenuList bg={mainColor}>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          Image
        </MenuItem>
        <MenuItem onClick={spineHandler} bg={mainColor} _hover={{ bg: specialColor }}>
          Spine
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          WebFont
        </MenuItem>
        <MenuItem bg={mainColor} _hover={{ bg: specialColor }}>
          BitmapFont
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
