import { Flex } from '@chakra-ui/react';
import { Text } from 'pixi.js';
import { useEffect, useState } from 'react';
import { BaseSettings, InputProp } from '@peach/components';

export type TextSettingsProps = {
  text: Text;
};

export default function TextSettings({ text }: TextSettingsProps) {
  const [content, setContent] = useState(text.text);

  useEffect(() => {
    setContent(text.text);
  }, [text]);

  function contentHandler(value: string): void {
    setContent(value);
    text.text = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <InputProp content={content} onChange={contentHandler} />
      <BaseSettings element={text} />
    </Flex>
  );
}
