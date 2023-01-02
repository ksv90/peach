import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from '../chakraTheme';
import { AppProvider, ThemeProvider } from '../contexts';
import Main from './Main';

export default function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <ThemeProvider>
        <AppProvider>
          <Main />
        </AppProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
