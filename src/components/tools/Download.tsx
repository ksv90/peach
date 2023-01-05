import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAppContext, useElementsContext, useThemeContext } from '../../contexts';

const devices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

function createSelectFile(accept: string): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  if (!devices.test(navigator.userAgent)) input.webkitdirectory = true;
  input.accept = accept;
  input.multiple = true;
  return input;
}

export default function Download() {
  const { mainColor, specialColorHover } = useThemeContext();
  const { assets } = useAppContext();
  const { updateSkeletons, updateBitmapFonts } = useElementsContext();

  async function selectSpine({ target }: Event) {
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.files) throw new Error('Files are not selected');
    try {
      await assets.loadFiles(target.files);
    } catch (err) {
      new Error(`Spine not loaded ${err}`);
    } finally {
      updateSkeletons(assets.getSkeletonDatas());
      updateBitmapFonts(assets.getBitmapFontsNames());
    }
  }

  function spineHandler() {
    const input = createSelectFile(assets.getAccept());
    input.addEventListener('change', selectSpine, { once: true });
    input.click();
    input.remove();
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
