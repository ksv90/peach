import { Flex } from '@chakra-ui/react';
import Add from './tools/Add';
import Download from './tools/Download';
import Settings from './tools/Settings';

export default function ToolBar() {
  return (
    <Flex alignItems="center" paddingLeft="5px" gap="5px">
      <Settings />
      <Download />
      <Add />
    </Flex>
  );
}
