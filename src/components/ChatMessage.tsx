import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import Message from "../entities/Message";
import Username from "./Username";
import FormatedDate from "./FormatedDate";
import CodeHubAvatar from "./CodeHubAvatar";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const user = message.user;
  return (
    <Box paddingX={"15px"} borderLeft={"solid"}>
      <HStack>
        <CodeHubAvatar user={user} additionalAttributes={{ size: "sm" }} />
        <Username username={user.username} />
        <FormatedDate date={message.created} />
      </HStack>
      <Text fontWeight={"normal"}>{message.content}</Text>
    </Box>
  );
};

export default ChatMessage;
