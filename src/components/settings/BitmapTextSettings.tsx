import { Flex } from '@chakra-ui/react';
import { BitmapText } from 'pixi.js';
import { useEffect, useState } from 'react';
import { BaseSettings, InputProp } from '@peach/components';

export type BitmapTextSettingsProps = {
  bitmapText: BitmapText;
};

export default function BitmapTextSettings({ bitmapText }: BitmapTextSettingsProps) {
  const [content, setContent] = useState(bitmapText.text);

  useEffect(() => {
    setContent(bitmapText.text);
  }, [bitmapText]);

  function contentHandler(value: string): void {
    setContent(value);
    bitmapText.text = value;
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <InputProp content={content} onChange={contentHandler} />
      <BaseSettings element={bitmapText} />
    </Flex>
  );
}
