import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@peach/config';
import { AppProvider, ElementsProvider, ThemeProvider } from '@peach/contexts';
import { Main } from '@peach/components';
import { Spine } from '@pixi-spine/runtime-4.1';
import { SpineMesh } from '@pixi-spine/base';
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
