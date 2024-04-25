/* eslint-disable @typescript-eslint/unbound-method */
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import { FormControlProp } from '@peach/components';
import type { AddTextPayload } from '@peach/contexts';
import { useAppContext,useThemeContext } from '@peach/contexts';
import { uploadFiles } from '@peach/utils';
import { ChangeEvent, useState } from 'react';

export type WebFontsModalProps = {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddTextPayload): void;
  colorHover?: string;
};

export default function WebFontsModal(props: WebFontsModalProps) {
  const { isOpen, onClose, itemClick } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const [content, setContent] = useState('');
  const [systemFont, setSystemFont] = useState('');
  const [loadedFont, setLoadedFont] = useState('');
  const [invalid, setInvalid] = useState(false);
  const webFonts = assets.getWebFonts();

  function uploadCkickHandler() {
    uploadFiles(assets, setFilesUploaded);
  }

  function createTextClickHandler() {
    if (!content.length) return setInvalid(true);
    itemClick([content, loadedFont || systemFont]);
    close();
  }

  function loadedFontChangeHandler({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
    setLoadedFont(currentTarget.value);
  }

  const contentFocusHandler = () => setInvalid(false);

  function close() {
    setContent('');
    setSystemFont('');
    setLoadedFont('');
    setInvalid(false);
    onClose();
  }

  const selectFont = (
    <Select placeholder="select uploaded web font" onChange={loadedFontChangeHandler}>
      {webFonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </Select>
  );

  const uploadFont = (
    <Flex borderWidth="1px" borderRadius="5px" padding="15px" flexDirection="column">
      <Text textTransform="uppercase">WebFont not loaded</Text>
      <Flex justifyContent="space-between" alignItems="center" gap="10px">
        <Text>Upload the webFont to create it</Text>
        <Button bg={specialColor} _hover={{ bg: specialColorHover }} onClick={uploadCkickHandler}>
          Upload
        </Button>
      </Flex>
    </Flex>
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform="uppercase">Creating text</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControlProp
            header="Content"
            content={content}
            onChange={setContent}
            onFocus={contentFocusHandler}
            isRequired
            invalid={invalid}
            helperMessage="Enter the text you want to create"
            errorMessage="Need to enter text"
          />
          {webFonts.length ? selectFont : uploadFont}
          <FormControlProp header="Use system font" content={systemFont} onChange={setSystemFont} />
        </ModalBody>
        <ModalFooter gap="5px">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="custom" mr={3} onClick={createTextClickHandler}>
            Create text
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
