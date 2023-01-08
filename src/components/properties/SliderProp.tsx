import {
  Box,
  Flex,
  Slider,
  Text,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useThemeContext } from '../../contexts';

export type SliderPropProps = {
  readonly content: string;
  readonly value: number;
  readonly sliderOptions: {
    readonly min?: number;
    readonly max: number;
    readonly step?: number;
  };
  onChange(value: number): void;
};

export default function SliderProp(props: SliderPropProps) {
  const { content, value, onChange, sliderOptions } = props;
  const { min = 0, max, step = 1 } = sliderOptions;
  const { sliderColor, sliderFill } = useThemeContext();

  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Flex gap="5px">
        <Text fontWeight="bold" fontFamily="Inter">
          {`${content}:`}
        </Text>
        <Text>{value}</Text>
      </Flex>
      <Slider value={value} min={min} max={max} step={step} onChange={onChange}>
        <SliderTrack bg={sliderColor}>
          <SliderFilledTrack bg={sliderFill} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
