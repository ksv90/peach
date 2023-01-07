import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider, ElementsProvider, ThemeProvider } from '../contexts';
import theme from '../theme';
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
