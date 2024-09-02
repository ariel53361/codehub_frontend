import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

interface Props {
  roomCount: number | undefined;
}
const RoomListUpper = ({ roomCount }: Props) => {
  return (
    <HStack justifyContent="space-between" alignItems="center">


      <Button bg="#71c6dd">+ Create Room</Button>
    </HStack>
  );
};

export default RoomListUpper;
