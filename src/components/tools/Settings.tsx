import {
  AddIcon,
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAppContext, useElementsContext, useThemeContext } from '../../contexts';
import { createSelectFile } from '../../utils';

export default function Settings() {
  const { mainColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const { updateSkeletons, updateBitmapFonts } = useElementsContext();

  function uploadCkickHandler() {
    createSelectFile(assets.getAccept(), async (files) => {
      try {
        await assets.loadFiles(files);
      } catch (err) {
        new Error(`Files not loaded ${err}`);
      } finally {
        updateSkeletons(assets.getSkeletonDatas());
        updateBitmapFonts(assets.getBitmapFontsNames());
        setFilesUploaded();
      }
    });
  }

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
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<DownloadIcon />}
          command="⌘U"
          onClick={uploadCkickHandler}
        >
          Upload
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<AddIcon />}
          textDecoration="line-through"
          command="⌘T"
        >
          New Tab
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<ExternalLinkIcon />}
          command="⌘N"
          textDecoration="line-through"
        >
          New Window
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<RepeatIcon />}
          command="⌘⇧N"
          textDecoration="line-through"
        >
          Open Closed Tab
        </MenuItem>
        <MenuItem
          bg={mainColor}
          _hover={{ bg: specialColorHover }}
          icon={<EditIcon />}
          command="⌘O"
          textDecoration="line-through"
        >
          Open File...
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
