import { Heading, Text } from "@chakra-ui/react";

import useRooms from "../hooks/useRooms";
import useRoomQueryStore from "../store/roomQueryStore";

const RoomHeading = () => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const { data, error, isLoading } = useRooms();
  return (
    <>
      <Heading as={"h1"}>{roomQuery.topic?.name} Rooms</Heading>
      <Text>{data?.count} Rooms available</Text>
    </>
  );
};

export default RoomHeading;
