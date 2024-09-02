import { MdPeopleAlt } from "react-icons/md";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Room from "../entities/Room";
import RoomParticipants from "./RoomParticipants";
import { Link } from "react-router-dom";
import FormatedDate from "./FormatedDate";
import CodeHubAvatar from "./CodeHubAvatar";

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => {
  return (
    <Card borderRadius={10} height="200px">
      <CardBody>
        <Flex gap="12px" flexDirection="column" justifyContent="space-between">
          {/* 1-avatar, name and date */}
          <Flex alignItems="center" justifyContent="space-between">
            <Flex gap="2" alignItems="center">
              <CodeHubAvatar
                user={room.host}
                additionalAttributes={{ border: "2px solid #71c6dd", size: "sm" }}
              />
              <Text>{room.host.username}</Text>
            </Flex>
            <FormatedDate date={room.created} />
          </Flex>
          <Box>
            <Link to={`room/${room.id}`}>
              <Heading fontSize="2xl" size="sm">
                {room.subject}
              </Heading>
            </Link>
          </Box>
          <Flex>
            <RoomParticipants participants={room.participants} />
          </Flex>
          <Divider />
          <Flex justifyContent="space-between">
            <HStack>
              <MdPeopleAlt size={20} />
              <Text color={"#b2bdbd"}>{room.participants_num} Joined</Text>
            </HStack>
            <Text>{room.topic.name}</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RoomCard;
