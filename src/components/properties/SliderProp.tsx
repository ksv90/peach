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

interface SliderPropProps {
  readonly content: string;
  readonly value: number;
  readonly sliderOptions: {
    readonly min?: number;
    readonly max: number;
    readonly step?: number;
  };
  readonly changeHandler: (value: number) => void;
}

export default function SliderProp(props: SliderPropProps) {
  const { content, value, changeHandler, sliderOptions } = props;
  const { min = 0, max, step = 1 } = sliderOptions;
  const { sliderColor, sliderFill } = useThemeContext();

  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Flex>
        <Text fontWeight="bold" fontFamily="Inter">
          {`${content}: `}
        </Text>
        <Text marginLeft="5px">{value}</Text>
      </Flex>
      <Slider value={value} min={min} max={max} step={step} onChange={changeHandler}>
        <SliderTrack bg={sliderColor}>
          <SliderFilledTrack bg={sliderFill} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
