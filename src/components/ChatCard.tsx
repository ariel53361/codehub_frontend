import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import Username from "./Username";
import Room from "../entities/Room";
import useRoomMessages from "../hooks/useRoomMessages";
import FormatedDate from "./FormatedDate";
import AddMessageForm from "./AddMessageForm";
import useAuthStore from "../store/authStore";
import ChatMessageList from "./ChatMessageList";
import CodeHubAvatar from "./CodeHubAvatar";

interface Props {
  room: Room;
}

const ChatCard = ({ room }: Props) => {
  const { data, error, isLoading } = useRoomMessages(room.id.toString());
  const host = room.host;
  const accessToken = useAuthStore((s) => s.accessToken);

  if (error) return <Text>{error.message}</Text>;
  return (
    <Card>
      <CardHeader bg={"#696d97"} h={"2px"} borderTopRadius={"7px"}>
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
            <Button>JOIN</Button>
          </HStack>
          <FormatedDate date={room.created} />
          <Text color={"#8b8b8b"} fontSize={"12px"}>
            HOSTED BY
          </Text>
          <HStack>
            <CodeHubAvatar
              user={host}
              additionalAttributes={{ size: "sm" }}
            />
            <Username username={host.username} />
          </HStack>
          <ChatMessageList />
        </VStack>
        {accessToken && <AddMessageForm />}
      </CardBody>
    </Card>
  );
};

export default ChatCard;
