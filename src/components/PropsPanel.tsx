import { Container, Text } from '@chakra-ui/react';
import { useThemeContext } from '../contexts';

export default function PropsPanel() {
  const themeContext = useThemeContext();
  return (
    <Container>
      <Text
        paddingTop="10px"
        borderColor={themeContext.textColor}
        borderStyle="solid"
        borderBottomWidth="1px"
        textTransform="uppercase"
        align="center"
      >
        props panel
      </Text>
    </Container>
  );
}
