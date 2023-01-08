import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@peach/config';
import { AppProvider, ElementsProvider, ThemeProvider } from '@peach/contexts';
import { Main } from '@peach/components';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <AppProvider>
          <ElementsProvider>
            <Main />
          </ElementsProvider>
        </AppProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
