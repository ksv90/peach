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
import { useAppContext, useThemeContext } from '../contexts';

interface AnimationsModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function AnimationsModal({ isOpen, onClose }: AnimationsModalProps) {
  const { mainColorHover } = useThemeContext();
  const { skeletonList, addAnimation } = useAppContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select animation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowMultiple>
            {Object.entries(skeletonList).map(([name, skeleton]) => {
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
                          _hover={{ bg: mainColorHover }}
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
