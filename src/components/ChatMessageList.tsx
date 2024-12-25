import { VStack } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";
import { Message } from "../entities/Message";

interface Props {
  roomMessages?: Message[];
}

const ChatMessageList = ({ roomMessages }: Props) => {
  return (
    <VStack
      bg={"#1a202c"}
      align={"start"}
      gap={"20px"}
      maxH="700px"
      overflowY="scroll"
      p="25px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      w={"100%"}
    >
      {roomMessages?.map((m) => (
        <ChatMessage message={m} key={m.id} />
      ))}
    </VStack>
  );
};

export default ChatMessageList;
