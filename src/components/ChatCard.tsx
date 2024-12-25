import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Room } from "../entities/Room";
import useRoomMessages from "../hooks/useRoomMessages";
import FormatedDate from "./FormatedDate";
import AddMessageForm from "./AddMessageForm";
import useAuthStore from "../store/authStore";
import ChatMessageList from "./ChatMessageList";
import LinkedAvatar from "./LinkedAvatar";
import { useState } from "react";
import Pagination from "./Pagination";
import LinkedUsername from "./LinkedUsername";
import ApiErrorDisplay from "./ApiErrorDisplay";

interface Props {
  room: Room;
}

const ChatCard = ({ room }: Props) => {
  const host = room.host;
  const accessToken = useAuthStore((s) => s.accessToken);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useRoomMessages({
    page,
    roomId: room.id,
  });

  if (error) return <ApiErrorDisplay error={error} />;
  if (isLoading) return <Spinner />;
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
            {data && (
              <Pagination
                currentPage={page}
                totalCount={data.count}
                onPageChange={setPage}
              />
            )}
          </HStack>
          <FormatedDate date={room.created} />
          <Text color={"darkGray"} fontSize={"12px"}>
            HOSTED BY
          </Text>
          <HStack>
            <LinkedAvatar user={host} />
            <LinkedUsername user={host} isHighlighted={true} />
          </HStack>
          <ChatMessageList roomMessages={data?.results} />
        </VStack>
        {accessToken && <AddMessageForm />}
      </CardBody>
    </Card>
  );
};

export default ChatCard;
