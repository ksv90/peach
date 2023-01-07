import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProvider, ElementsProvider, ThemeProvider } from '../contexts';
import Main from './Main';

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
