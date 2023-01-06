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
import { useAppContext, useElementsContext, useThemeContext } from '../../contexts';
import { createSelectFile } from '../../utils';

interface AnimationsModalProps {
  animationList: Record<string, SkeletonData>;
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: [string, string]): void;
  colorHover?: string;
}

export default function AnimationsModal(props: AnimationsModalProps) {
  const { animationList, isOpen, onClose, itemClick, colorHover } = props;
  const { specialColor, specialColorHover } = useThemeContext();
  const { assets, setFilesUploaded } = useAppContext();
  const { updateSkeletons, updateBitmapFonts } = useElementsContext();

  function uploadCkickHandler() {
    createSelectFile(assets.getAccept(), async (files) => {
      try {
        await assets.loadFiles(files);
      } catch (err) {
        new Error(`Files not loaded ${err}`);
      } finally {
        updateSkeletons(assets.getSkeletonDatas());
        updateBitmapFonts(assets.getBitmapFontsNames());
        setFilesUploaded();
      }
    });
  }

  function clickHandler(name: string, anim: string) {
    itemClick([name, anim]);
    onClose();
  }

  const list = Object.entries(animationList);

  const modalContentNotAnimations = (
    <>
      <ModalHeader>Animations not loaded</ModalHeader>
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
