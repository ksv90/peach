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
import { SkeletonData } from '@pixi-spine/runtime-4.1';
import type { AddAnimationPayload } from '@peach/contexts';
import { useAppContext, useThemeContext } from '@peach/contexts';
import { uploadFiles } from '@peach/utils';

export type SkeletonsModalProps = {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddAnimationPayload): void;
  colorHover?: string;
};

export default function SkeletonsModal(props: SkeletonsModalProps) {
  const { isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, loader, setFilesUploaded } = useAppContext();
  const skeletons = assets.getSkeletonDatas();

  function uploadCkickHandler() {
    uploadFiles(loader, setFilesUploaded);
  }

  function clickHandler(anim: string, skeleton: SkeletonData) {
    itemClick([anim, skeleton]);
    onClose();
  }

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
          {skeletons.map(([name, skeleton]) => {
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
                        onClick={() => clickHandler(anim, skeleton)}
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
      <ModalContent>{skeletons.length ? modalContent : modalContentNotAnimations}</ModalContent>
    </Modal>
  );
}
