import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  ModalFooter,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { AddHideAndShowTextureScriptPayload, useElementsContext } from '@peach/contexts';

export type HideAndShowTextureModalProps = {
  isOpen: boolean;
  onClose(): void;
  itemClick(payload: AddHideAndShowTextureScriptPayload): void;
  colorHover?: string;
};

export default function HideAndShowTextureModal(props: HideAndShowTextureModalProps) {
  const { isOpen, onClose, itemClick } = props;
  const { sprites, spineAnimations } = useElementsContext();
  const [loadedTexture, setLoadedTexture] = useState('');
  const [loadedAnimation, setLoadedAnimation] = useState('');
  const textures = Object.keys(sprites).map((name) => name);
  const animations = Object.values(spineAnimations).map((spine) => spine.name);

  function createTextClickHandler() {
    if (!loadedTexture || !loadedAnimation) return;
    itemClick([loadedTexture, loadedAnimation]);
    close();
  }

  function textureChangeHandler({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
    setLoadedTexture(currentTarget.value);
  }

  function animationChangeHandler({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
    setLoadedAnimation(currentTarget.value);
  }

  function close() {
    setLoadedTexture('');
    setLoadedAnimation('');
    onClose();
  }

  const selectTexture = (
    <Select margin="10px 0" placeholder="select textures" onChange={textureChangeHandler}>
      {textures.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>
  );

  const selectAnimation = (
    <Select margin="10px 0" placeholder="select animation" onChange={animationChangeHandler}>
      {animations.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>
  );

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform="uppercase">Creating script</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {textures.length ? selectTexture : <p>Sprites are not added to the scene</p>}
          {animations.length ? selectAnimation : <p>Animations are not added to the scene</p>}
        </ModalBody>
        <ModalFooter gap="5px">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="custom" mr={3} onClick={createTextClickHandler}>
            Create script
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
