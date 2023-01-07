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
import { useState } from 'react';
import type { AddBitmapTextPayload, ElementsReducerState } from '../../contexts';
import { useElementsContext, useThemeContext, useAppContext } from '../../contexts';
import { uploadFiles } from '../../utils';
import { InputProp } from '../properties';

export type BitmapFontsModalProps = Pick<ElementsReducerState, 'bitmapFonts'> & {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddBitmapTextPayload): void;
  colorHover?: string;
};

export default function BitmapFontsModal(props: BitmapFontsModalProps) {
  const { bitmapFonts, isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, loader, setFilesUploaded } = useAppContext();
  const elementsContext = useElementsContext();
  const [invalid, setInvalid] = useState(false);
  const [content, setContent] = useState('');

  function uploadCkickHandler() {
    uploadFiles(assets, loader, elementsContext, setFilesUploaded).catch(
      () => new Error('Files not loaded'),
    );
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

  function changeHandler(value: string) {
    setContent(value);
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
      <ModalHeader textTransform="uppercase">Creating bitmapText</ModalHeader>
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
        {bitmapFonts.map((font) => (
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
      <ModalContent>{bitmapFonts.length ? modalContent : modalContentNotFonts}</ModalContent>
    </Modal>
  );
}
