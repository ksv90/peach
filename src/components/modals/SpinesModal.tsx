import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
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
import type { AddAnimationPayload, ElementsReducerState } from '../../contexts';
import { useAppContext, useElementsContext, useThemeContext } from '../../contexts';
import { uploadFiles } from '../../utils';

export type SpinesModalProps = Pick<ElementsReducerState, 'skeletons'> & {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddAnimationPayload): void;
  colorHover?: string;
};

export default function SpinesModal(props: SpinesModalProps) {
  const { skeletons, isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, loader, setFilesUploaded } = useAppContext();
  const elementsContext = useElementsContext();

  function uploadCkickHandler() {
    uploadFiles(assets, loader, elementsContext, setFilesUploaded).catch(
      () => new Error('Files not loaded'),
    );
  }

  function clickHandler(name: string, anim: string) {
    itemClick([name, anim]);
    onClose();
  }

  const list = Object.entries(skeletons);

  const modalContentNotAnimations = (
    <>
      <ModalHeader textTransform="uppercase">Animations not loaded</ModalHeader>
      <ModalBody>
        <Flex justifyContent="space-between" alignItems="center" gap="10px">
          <Text>Upload the animations to create it</Text>
          <Button bg={specialColor} _hover={{ bg: specialColorHover }} onClick={uploadCkickHandler}>
            Upload
          </Button>
        </Flex>
      </ModalBody>
    </>
  );

  const modalContent = (
    <>
      <ModalHeader>Select animation</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Accordion allowMultiple>
          {list.map(([name, skeleton]) => {
            return (
              <AccordionItem key={name}>
                <AccordionButton>
                  <Text borderBottom="1px white solid">{name}</Text>
                </AccordionButton>
                <AccordionPanel>
                  {skeleton.animations?.map(({ name: anim }) => {
                    return (
                      <Text
                        key={anim}
                        transition="all 0.2s"
                        _hover={{ bg: colorHover }}
                        onClick={() => clickHandler(name, anim)}
                      >
                        {anim}
                      </Text>
                    );
                  })}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ModalBody>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{list.length ? modalContent : modalContentNotAnimations}</ModalContent>
    </Modal>
  );
}
