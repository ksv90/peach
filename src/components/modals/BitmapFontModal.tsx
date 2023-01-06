import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Button,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useAppContext, useElementsContext, useThemeContext } from '../../contexts';
import { createSelectFile } from '../../utils';
import { InputProp } from '../properties';

interface Properties {
  bitmapFontNames: ReadonlyArray<string>;
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: [string, string]): void;
  colorHover?: string;
}

export default function BitmapFontModal(props: Properties) {
  const { bitmapFontNames, isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const { updateSkeletons, updateBitmapFonts } = useElementsContext();
  const [invalid, setInvalid] = useState(false);
  const [content, setContent] = useState('');

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

  function clickHandler(font: string) {
    if (!content.length) return setInvalid(true);
    itemClick([content, font]);
    closeHandler();
  }

  function closeHandler() {
    setContent('');
    onClose();
  }

  function changeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    setContent(currentTarget.value);
  }

  const modalContentNotFonts = (
    <>
      <ModalHeader>BitmapFont not loaded</ModalHeader>
      <ModalBody>
        <Flex justifyContent="space-between" alignItems="center" gap="10px">
          <Text>Upload the bitmapFont to create it</Text>
          <Button bg={specialColor} _hover={{ bg: specialColorHover }} onClick={uploadCkickHandler}>
            Upload
          </Button>
        </Flex>
      </ModalBody>
    </>
  );

  const modalContent = (
    <>
      <ModalHeader>Creating bitmapText</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <InputProp
          content={content}
          invalid={invalid}
          onChange={changeHandler}
          onFocus={() => setInvalid(false)}
        />
        <Flex justifyContent="center" alignItems="center" gap="10px">
          <ArrowDownIcon />
          <Text as="h1" margin="10px 0" textTransform="uppercase">
            select bitmapFont
          </Text>
          <ArrowDownIcon />
        </Flex>
        {bitmapFontNames.map((font) => (
          <Text
            key={font}
            padding="10px"
            borderBottomWidth="1px"
            transition="all 0.2s"
            _hover={{ bg: colorHover }}
            _first={{ borderTopWidth: '1px' }}
            onClick={() => clickHandler(font)}
          >
            {font}
          </Text>
        ))}
      </ModalBody>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent>{bitmapFontNames.length ? modalContent : modalContentNotFonts}</ModalContent>
    </Modal>
  );
}
