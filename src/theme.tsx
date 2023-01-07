import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
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

export default theme;