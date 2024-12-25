import { MdPeopleAlt } from "react-icons/md";
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { Room } from "../entities/Room";
import RoomParticipants from "./RoomParticipants";
import { Link } from "react-router-dom";
import FormatedDate from "./FormatedDate";
import LinkedAvatar from "./LinkedAvatar";
import LinkedUsername from "./LinkedUsername";

interface Props {
  room: Room;
}

const RoomCard = ({ room }: Props) => {
  return (
    <Card borderRadius={10} height="200px">
      <CardBody>
        <Flex
          gap="12px"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Flex gap="2" alignItems="center">
              <LinkedAvatar
                user={room.host}
                border="2px solid var(--chakra-colors-primaryBlue)"
              />
              <LinkedUsername user={room.host} />
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
              <Text color={"lightGray"}>{room.participants_num} Joined</Text>
            </HStack>
            <Text>{room.topic.name}</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RoomCard;
