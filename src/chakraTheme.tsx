import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const chakraTheme = extendTheme({
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

export default chakraTheme;
