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
import { Texture } from 'pixi.js';
import type { AddSpritePayload } from '@peach/contexts';
import { useAppContext, useThemeContext } from '@peach/contexts';
import { uploadFiles } from '@peach/utils';

export type TexturesModalProps = {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddSpritePayload): void;
  colorHover?: string;
};

export default function TexturesModal(props: TexturesModalProps) {
  const { isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, loader, setFilesUploaded } = useAppContext();
  const textures = assets.getTextures();

  function uploadCkickHandler() {
    uploadFiles(loader, setFilesUploaded);
  }

  function clickHandler(name: string, texture: Texture) {
    itemClick([name, texture]);
    close();
  }

  function close() {
    onClose();
  }

  const modalContentNotTexture = (
    <>
      <ModalHeader>Texture not loaded</ModalHeader>
      <ModalBody>
        <Flex justifyContent="space-between" alignItems="center" gap="10px">
          <Text>Upload the texture to create it</Text>
          <Button bg={specialColor} _hover={{ bg: specialColorHover }} onClick={uploadCkickHandler}>
            Upload
          </Button>
        </Flex>
      </ModalBody>
    </>
  );

  const modalContent = (
    <>
      <ModalHeader textTransform="uppercase">Creating texture</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex justifyContent="center" alignItems="center" gap="10px">
          <ArrowDownIcon />
          <Text as="h1" margin="10px 0" textTransform="uppercase">
            select texture
          </Text>
          <ArrowDownIcon />
        </Flex>
        {textures.map(([name, texture]) => (
          <Text
            key={name}
            padding="10px"
            borderBottomWidth="1px"
            transition="all 0.2s"
            _hover={{ bg: colorHover }}
            _first={{ borderTopWidth: '1px' }}
            onClick={() => clickHandler(name, texture)}
          >
            {name}
          </Text>
        ))}
      </ModalBody>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>{textures.length ? modalContent : modalContentNotTexture}</ModalContent>
    </Modal>
  );
}
