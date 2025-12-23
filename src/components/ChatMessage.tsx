import { Box, HStack, Text } from "@chakra-ui/react";
import { Message } from "../entities/Message";
import FormatedDate from "./FormatedDate";
import LinkedAvatar from "./LinkedAvatar";
import LinkedUsername from "./LinkedUsername";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const profile = message.profile;
  return (
    <Box paddingX={"15px"} borderLeft={"solid"}>
      <HStack>
        <LinkedAvatar profile={profile}/>
        <LinkedUsername profile={profile} isHighlighted={true} />
        <FormatedDate date={message.created} />
      </HStack>
      <Text fontWeight={"normal"}>{message.content}</Text>
    </Box>
  );
};

export default ChatMessage;
