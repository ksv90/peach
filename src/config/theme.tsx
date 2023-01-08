import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  components: {
    Button: {
      variants: {
        custom: {
          bg: 'blue.500',
          _hover: {
            bg: 'blue.600',
          },
        },
      },
    },
  },
});
