import { ViewIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { useThemeContext } from '../contexts';

export default function SkeletonItem({ children }: PropsWithChildren) {
  const { specialColor } = useThemeContext();
  return (
    <Flex
      alignItems="center"
      gap="10px"
      transition="all 0.2s"
      padding="5px 0"
      borderRadius="md"
      _hover={{ bg: specialColor }}
    >
      <ViewIcon boxSize={6} flexBasis="15%" />
      <Text>{children}</Text>
    </Flex>
  );
}
