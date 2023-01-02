import { Container, Text } from '@chakra-ui/react';
import { useAppContext, useThemeContext } from '../contexts';
import SkeletonItem from './SkeletonItem';

export default function LayersPanel() {
  const { textColor } = useThemeContext();
  const { skeletonList } = useAppContext();

  return (
    <Container>
      <Text
        paddingTop="10px"
        borderColor={textColor}
        borderStyle="solid"
        borderBottomWidth="1px"
        textTransform="uppercase"
        align="center"
        marginBottom="15px"
      >
        layers panel
      </Text>
      {Object.keys(skeletonList).map((name) => (
        <SkeletonItem key={name}>{name}</SkeletonItem>
      ))}
    </Container>
  );
}
