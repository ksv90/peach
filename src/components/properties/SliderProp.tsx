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
  content: string;
  value: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  changeHandler(value: number): void;
}

export default function SliderProp(props: SliderPropProps) {
  const { content, value, changeHandler, defaultValue = 1, min = 0, max = 1, step = 0.01 } = props;
  const { sliderColor, sliderFill, mainColorHover } = useThemeContext();

  return (
    <Box padding="5px 0" borderTopColor={mainColorHover} borderTopWidth="1px">
      <Flex>
        <Text fontWeight="bold" fontFamily="Inter">
          {`${content}: `}
        </Text>
        <Text marginLeft="5px">{value}</Text>
      </Flex>
      <Slider defaultValue={defaultValue} min={min} max={max} step={step} onChange={changeHandler}>
        <SliderTrack bg={sliderColor}>
          <SliderFilledTrack bg={sliderFill} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
