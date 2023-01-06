import { Flex, Text } from '@chakra-ui/react';
import { useThemeContext } from '../contexts';

interface LayerItemProps {
  name: string;
  showProps(name: string): void;
  selected?: boolean;
  icon: JSX.Element;
}

export default function LayerItem({ name, showProps, icon, selected }: LayerItemProps) {
  const { specialColor, specialColorHover, mainColorHover, mainColor } = useThemeContext();
  return (
    <Flex
      alignItems="center"
      gap="10px"
      transition="all 0.2s"
      padding="5px 0"
      borderRadius="md"
      bg={selected ? specialColor : mainColor}
      _hover={{ bg: selected ? specialColorHover : mainColorHover }}
      onClick={() => showProps(name)}
    >
      {icon}
      <Text textOverflow="ellipsis" overflow="hidden" overflowWrap="normal">
        {name}
      </Text>
    </Flex>
  );
}
