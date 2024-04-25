import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react';
import { NumberInputProp } from '@peach/components';
import { useThemeContext } from 'contexts/ThemeContext';

export type NumberTitlePropProps = {
  content: string;
  value: number;
  min?: number;
  max?: number;
  maxW?: number;
  step?: number;
  slider?: boolean;
  input?: boolean;
  onChange(value: number): void;
};

export default function NumberTitleProp(props: NumberTitlePropProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { content, value, min, max, step, onChange, input, slider, maxW } = props;
  const { sliderColor, sliderFill } = useThemeContext();

  const sliderElement = (slider || !input) && (
    <Slider focusThumbOnChange={false} value={value} min={min} max={max} step={step} onChange={onChange}>
      <SliderTrack bg={sliderColor}>
        <SliderFilledTrack bg={sliderFill} />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );

  const inputElement = input ? (
    <NumberInputProp value={value} min={min} max={max} step={step} onChange={onChange} maxW={maxW} />
  ) : (
    <Text>{value}</Text>
  );

  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Flex justifyContent="space-between" alignItems="center">
        <Text textTransform="uppercase">{content}</Text>
        {inputElement}
      </Flex>
      {sliderElement}
    </Box>
  );
}
