import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Room } from "../entities/Room";
import FormatedDate from "./FormatedDate";
import SendMessageForm from "./SendMessageForm";
import useAuthStore from "../store/authStore";
import ChatMessageList from "./ChatMessageList";
import LinkedAvatar from "./LinkedAvatar";
import LinkedUsername from "./LinkedUsername";

interface Props {
  room: Room;
}

const ChatCard = ({ room }: Props) => {
  const host = room.host;
  const accessToken = useAuthStore((s) => s.accessToken);
 
  return (
    <Card>
      <CardHeader bg={"primaryPurple"} h={"2px"} borderTopRadius={"7px"}>
        <Flex align={"center"} h="100%">
          <Link to={"/"}>
            <IoArrowBack size={"19px"} />
          </Link>
          <Text fontSize={"sm"}>CODE HUB CHAT</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <VStack align={"start"}>
          <HStack justifyContent={"space-between"} w={"100%"}>
            <Heading>{room.subject}</Heading>
          </HStack>
          <FormatedDate date={room.created} />
          <Text color={"darkGray"} fontSize={"12px"}>
            HOSTED BY
          </Text>
          <HStack>
            <LinkedAvatar user={host} />
            <LinkedUsername user={host} isHighlighted={true} />
          </HStack>
          <ChatMessageList roomId={room.id} />
        </VStack>
        {accessToken && <SendMessageForm room={room} />}
      </CardBody>
    </Card>
  );
};

export default ChatCard;
