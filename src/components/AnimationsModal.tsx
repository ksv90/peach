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
import { SkeletonData } from '@pixi-spine/runtime-4.1';

interface AnimationsModalProps {
  animationList: Record<string, SkeletonData>;
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: [string, string]): void;
  colorHover?: string;
}

export default function AnimationsModal(props: AnimationsModalProps) {
  const { animationList, isOpen, onClose, itemClick, colorHover } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select animation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion allowMultiple>
            {Object.entries(animationList).map(([name, skeleton]) => {
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
                          onClick={() => {
                            itemClick([name, anim]);
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
