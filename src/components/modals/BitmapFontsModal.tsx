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
import type { AddBitmapTextPayload } from '@peach/contexts';
import { useThemeContext, useAppContext } from '@peach/contexts';
import { uploadFiles } from '@peach/utils';
import { useState } from 'react';
import { InputProp } from '@peach/components';

export type BitmapFontsModalProps = {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddBitmapTextPayload): void;
  colorHover?: string;
};

export default function BitmapFontsModal(props: BitmapFontsModalProps) {
  const { isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const [invalid, setInvalid] = useState(false);
  const [content, setContent] = useState('');
  const bitmapFonts = assets.getBitmapFonts();

  function uploadCkickHandler() {
    uploadFiles(assets, setFilesUploaded);
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
