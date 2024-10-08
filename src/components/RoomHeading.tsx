import { Heading, Text } from "@chakra-ui/react";
import useRooms from "../hooks/useRooms";
import useRoomQueryStore from "../store/roomQueryStore";

const RoomHeading = () => {
  

  return (
    <>
      <Heading as={"h1"}>{selectedTopic?.name} Rooms</Heading>
    </>
  );
};

export default RoomHeading;
