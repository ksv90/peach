import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useThemeContext } from '../../contexts';

interface SkeletonItemProps {
  anim: string;
  showProps(anim: string): void;
}

export default function AnimationItem({ anim, showProps }: SkeletonItemProps) {
  const { specialColor } = useThemeContext();
  return (
    <Flex
      alignItems="center"
      gap="10px"
      transition="all 0.2s"
      padding="5px 0"
      borderRadius="md"
      _hover={{ bg: specialColor }}
      onClick={() => showProps(anim)}
    >
      <CalendarIcon boxSize={6} flexBasis="15%" />
      <Text>{anim}</Text>
    </Flex>
  );
}
