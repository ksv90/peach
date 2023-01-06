import { Flex } from '@chakra-ui/react';
import Add from './Add';
import Download from './Download';
import Settings from './Settings';
import UploadInfo from './UploadInfo';

export default function ToolBar() {
  return (
    <Flex alignItems="center" paddingLeft="5px" gap="5px">
      <Settings />
      <Download />
      <Add />
      <UploadInfo />
    </Flex>
  );
}
