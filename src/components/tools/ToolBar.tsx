import { Flex } from '@chakra-ui/react';
import { Add, Download, Settings, UploadInfo } from '@peach/components';

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
