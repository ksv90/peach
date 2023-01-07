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
  ModalFooter,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import type { AddTextPayload, ElementsReducerState } from '../../contexts';
import { useElementsContext, useThemeContext, useAppContext } from '../../contexts';
import { uploadFiles } from '../../utils';
import { FormControlProp } from '../properties';

export type WebFontsModalProps = Pick<ElementsReducerState, 'webFonts'> & {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddTextPayload): void;
  colorHover?: string;
};

export default function WebFontsModal(props: WebFontsModalProps) {
  const { webFonts, isOpen, onClose, itemClick } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const elementsContext = useElementsContext();
  const [content, setContent] = useState('');
  const [systemFont, setSystemFont] = useState('');
  const [loadedFont, setLoadedFont] = useState('');
  const [invalid, setInvalid] = useState(false);

  function uploadCkickHandler() {
    uploadFiles(assets, elementsContext, setFilesUploaded).catch(
      () => new Error('Files not loaded'),
    );
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
