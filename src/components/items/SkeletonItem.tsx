import { ViewIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useThemeContext } from '../../contexts';

interface SkeletonItemProps {
  name: string;
  showProps(name: string): void;
}

export default function SkeletonItem({ name, showProps }: SkeletonItemProps) {
  const { specialColor } = useThemeContext();
  return (
    <Flex
      alignItems="center"
      gap="10px"
      transition="all 0.2s"
      padding="5px 0"
      borderRadius="md"
      _hover={{ bg: specialColor }}
      onClick={() => showProps(name)}
    >
      <ViewIcon boxSize={6} flexBasis="15%" />
      <Text>{name}</Text>
    </Flex>
  );
}
