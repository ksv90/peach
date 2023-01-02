import { Flex, Text } from '@chakra-ui/react';
import { useAppContext } from '../contexts';

interface SkeletonItemProps {
  name: string;
}

export default function SkeletonProps({ name }: SkeletonItemProps) {
  const { skeletonList } = useAppContext();
  const skeleton = skeletonList[name];

  return (
    <Flex flexDirection="column">
      <Text>{`animations amount: ${skeleton?.animations.length}`}</Text>
    </Flex>
  );
}
