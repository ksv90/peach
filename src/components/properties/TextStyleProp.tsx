import { Box, Select, Text } from '@chakra-ui/react';
import { AssetsTextStyles } from '@peach/core';
import { Text as TextElement } from 'pixi.js';
import { ChangeEvent, useEffect, useState } from 'react';

export type TextStylePropProps = {
  text: TextElement;
  textStyles: AssetsTextStyles;
};

export default function TextStyleProp(props: TextStylePropProps) {
  const { text, textStyles } = props;
  const [select, setSelect] = useState<HTMLSelectElement | null>(null);

  function changeHandler({ currentTarget }: ChangeEvent<HTMLSelectElement>) {
    setSelect(currentTarget);
    const [, textStyle] = textStyles.find(([name]) => currentTarget.value === name) ?? [];
    if (!textStyle) text.style = {};
    else text.style = textStyle;
  }

  useEffect(() => {
    if (select) select.value = '';
  }, [text]);

  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Text textTransform="uppercase">Select text style</Text>
      <Select placeholder="text style" onChange={changeHandler}>
        {textStyles.map(([font]) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </Select>
    </Box>
  );
}
