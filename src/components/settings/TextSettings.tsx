import { Flex } from '@chakra-ui/react';
import { Text } from 'pixi.js';
import { useEffect, useState } from 'react';
import {
  BaseSettings,
  FontSizeProp,
  InputProp,
  TextStyleProp,
  UploadTextStyleProp,
} from '@peach/components';
import { useAppContext } from '@peach/contexts';
import { uploadFiles } from '@peach/utils';

export type TextSettingsProps = {
  text: Text;
};

export default function TextSettings({ text }: TextSettingsProps) {
  const [content, setContent] = useState(text.text);
  const { assets, loader, setFilesUploaded } = useAppContext();
  const [fontSize, setFontSize] = useState(Number(text.style.fontSize ?? 16));
  const textStyles = assets.getTextStyles();

  useEffect(() => {
    setContent(text.text);
  }, [text]);

  function contentHandler(value: string): void {
    setContent(value);
    text.text = value;
  }

  function fontSizeHandler(value: number) {
    setFontSize(value);
    text.style.fontSize = value;
  }

  function uploadCkickHandler() {
    uploadFiles(loader, setFilesUploaded);
  }

  return (
    <Flex flexDirection="column" gap="5px">
      <InputProp content={content} onChange={contentHandler} />
      {textStyles.length ? (
        <TextStyleProp text={text} textStyles={textStyles} />
      ) : (
        <UploadTextStyleProp onClick={uploadCkickHandler} />
      )}
      <FontSizeProp value={fontSize} onChange={fontSizeHandler} />
      <BaseSettings element={text} />
    </Flex>
  );
}
