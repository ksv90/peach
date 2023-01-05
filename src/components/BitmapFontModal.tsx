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
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { InputProp } from './properties';

interface Properties {
  bitmapFontNames: ReadonlyArray<string>;
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: [string, string]): void;
  colorHover?: string;
}

export default function BitmapFontModal(props: Properties) {
  const { bitmapFontNames, isOpen, onClose, itemClick, colorHover } = props;
  const [invalid, setInvalid] = useState(false);
  const [content, setContent] = useState('');

  function clickHandler(font: string) {
    if (!content.length) return setInvalid(true);
    itemClick([content, font]);
    onClose();
  }

  function changeHandler({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    setContent(currentTarget.value);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
      </ModalContent>
    </Modal>
  );
}
