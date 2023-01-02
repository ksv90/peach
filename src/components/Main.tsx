import { Flex } from '@chakra-ui/react';
import { useThemeContext } from '../contexts';
import LayersPanel from './LayersPanel';
import PropsPanel from './PropsPanel';
import Scene from './Scene';
import ToolBar from './ToolBar';

const FRAME = '0 0 1px 0';

export default function Main() {
  const { textColor, mainColor, extraColor } = useThemeContext();
  return (
    <Flex flexDirection="column" color={textColor} bg={mainColor}>
      <Flex flexBasis="48px" boxShadow={FRAME}>
        <ToolBar />
      </Flex>
      <Flex flexBasis="calc(100vh - 48px)">
        <Flex flexBasis="20vw" minW="200px" boxShadow={FRAME}>
          <LayersPanel />
        </Flex>
        <Flex flexGrow="1" bg={extraColor} boxShadow={FRAME}>
          <Scene />
        </Flex>
        <Flex flexBasis="25vw" minW="250px" boxShadow={FRAME}>
          <PropsPanel />
        </Flex>
      </Flex>
    </Flex>
  );
}
