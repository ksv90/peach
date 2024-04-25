import { ChakraProvider } from '@chakra-ui/react';
import { Main } from '@peach/components';
import { theme } from '@peach/config';
import { AppProvider, ElementsProvider, ThemeProvider } from '@peach/contexts';
import { SpineMesh } from '@pixi-spine/base';
import { Spine } from '@pixi-spine/runtime-4.1';
import { Texture } from 'pixi.js';

Spine.prototype.newMesh = function (texture, vertices, uvs, indices, drawMode) {
  return new SpineMesh(texture ?? Texture.EMPTY, vertices, uvs, indices, drawMode);
};

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
