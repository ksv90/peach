import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, ScaleFade, Text } from '@chakra-ui/react';
import { useAppContext } from '../contexts';
import { Add, Download, Settings } from './tools';

export default function ToolBar() {
  const { filesUploaded } = useAppContext();

  return (
    <Flex alignItems="center" paddingLeft="5px" gap="5px">
      <Settings />
      <Download />
      <Add />
      <ScaleFade initialScale={1.2} in={filesUploaded}>
        <Flex alignItems="center" gap="10px" marginLeft="10px" color="green.400">
          <Text>Uploaded</Text>
          <CheckCircleIcon boxSize={8} />
        </Flex>
      </ScaleFade>
    </Flex>
  );
}
