import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, Text, ScaleFade } from '@chakra-ui/react';
import { useAppContext } from '../../contexts';

export default function UploadInfo() {
  const { filesUploaded } = useAppContext();
  return (
    <ScaleFade initialScale={1.2} in={filesUploaded}>
      <Flex alignItems="center" gap="10px" marginLeft="10px" color="green.400">
        <Text>Uploaded</Text>
        <CheckCircleIcon boxSize={8} />
      </Flex>
    </ScaleFade>
  );
}
