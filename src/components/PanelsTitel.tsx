import { Text } from '@chakra-ui/react';
import { useThemeContext } from '@peach/contexts';
import { PropsWithChildren } from 'react';

export default function PanelsTitel({ children }: PropsWithChildren) {
  const { textColor } = useThemeContext();
  return (
    <Text
      paddingTop="10px"
      borderColor={textColor}
      borderBottomWidth="1px"
      textTransform="uppercase"
      align="center"
      marginBottom="15px"
    >
      {children}
    </Text>
  );
}
