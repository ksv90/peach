import { Flex } from '@chakra-ui/react';
import { Add, Script, Settings, UploadInfo } from '@peach/components';

export default function ToolBar() {
  return (
    <Flex alignItems="center" paddingLeft="5px" gap="5px">
      <Settings />
      <Add />
      <Script />
      <UploadInfo />
    </Flex>
  );
}
