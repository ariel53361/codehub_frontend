import { VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import useRoomMessages from "../hooks/useRoomMessages";
import { useParams } from "react-router-dom";

const ChatMessageList = () => {
  const { roomId } = useParams();
  const { data } = useRoomMessages(roomId!);

  return (
    <VStack
      bg={"#1a202c"}
      align={"start"}
      gap={"20px"}
      maxH="400px"
      overflowY="scroll"
      p="25px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w={"100%"}
    >
      {data?.map((m) => (
        <ChatMessage message={m} key={m.id}></ChatMessage>
      ))}
    </VStack>
  );
};

export default ChatMessageList;
