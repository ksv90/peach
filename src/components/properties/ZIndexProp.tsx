import { Box, Flex, Text } from '@chakra-ui/react';
import { NumberInputProp } from '@peach/components';

export type ZIndexPropProps = {
  value: number;
  onChange(value: number): void;
};

export default function ZIndexProp(props: ZIndexPropProps) {
  const { value, onChange } = props;
  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Flex justifyContent="space-between" alignItems="center" gap="5px">
        <Text fontWeight="bold" fontFamily="Inter">
          zIndex:
        </Text>
        <NumberInputProp value={value} min={0} onChange={onChange} />
      </Flex>
    </Box>
  );
}
