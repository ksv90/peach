import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from '../chakraTheme';
import { AppProvider, ElementsProvider, ThemeProvider } from '../contexts';
import Main from './Main';

export default function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
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
