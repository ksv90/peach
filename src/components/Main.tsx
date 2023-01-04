import { Flex } from '@chakra-ui/react';
import { useThemeContext } from '../contexts';
import LayersPanel from './LayersPanel';
import PropsPanel from './PropsPanel';
import Scene from './Scene';
import ToolBar from './ToolBar';

const FRAME = '0 0 1px 0';

export default function Main() {
  const { textColor, mainColor, mainColorHover } = useThemeContext();
  return (
    <Flex flexDirection="column" color={textColor} bg={mainColor}>
      <Flex flexBasis="48px" boxShadow={FRAME}>
        <ToolBar />
      </Flex>
      <Flex flexBasis="calc(100vh - 48px)" overflow="hidden">
        <Flex flexBasis="20vw" minW="200px" boxShadow={FRAME}>
          <LayersPanel />
        </Flex>
        <Flex flexGrow="1" bg={mainColorHover} boxShadow={FRAME}>
          <Scene />
        </Flex>
        <Flex flexBasis="20vw" minW="200px" boxShadow={FRAME}>
          <PropsPanel />
        </Flex>
      </Flex>
    </Flex>
  );
}
