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
} from '@chakra-ui/react';
import { useAppContext } from '../contexts';

interface AnimationsModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function AnimationsModal({ isOpen, onClose }: AnimationsModalProps) {
  const { skeletonList, addAnimation } = useAppContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select animation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion>
            {Object.entries(skeletonList).map(([name, skeleton]) => {
              return (
                <AccordionItem key={name}>
                  <AccordionButton>{name}</AccordionButton>
                  <AccordionPanel>
                    {skeleton.animations?.map(({ name: anim }) => {
                      return (
                        <Text
                          key={anim}
                          onClick={() => {
                            addAnimation([name, anim]);
                            onClose();
                          }}
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
      </ModalContent>
    </Modal>
  );
}
