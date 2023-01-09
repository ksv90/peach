import { Box, Button, Flex, Text } from '@chakra-ui/react';

export type TextStylePropProps = {
  onClick(): void;
};

export default function UploadTextStyleProp({ onClick }: TextStylePropProps) {
  return (
    <Box padding="5px 0" borderTopWidth="1px">
      <Text textTransform="uppercase">text styles not loaded</Text>
      <Flex justifyContent="space-between" alignItems="center">
        <Text>Upload text style</Text>
        <Button variant="custom" mr={3} onClick={onClick}>
          Upload
        </Button>
      </Flex>
    </Box>
  );
}
