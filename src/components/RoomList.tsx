import { SimpleGrid, Text } from "@chakra-ui/react";
import RoomCard from "./RoomCard";
import RoomCardSkeleton from "./RoomCardSkeleton";
import useRooms from "../hooks/useRooms";

const RoomList = () => {

  const { data, error, isLoading } = useRooms();
  const skeletons = [1, 2, 3];
  const rooms = data?.results;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SimpleGrid gap={6}>
      {isLoading &&
        skeletons.map((skeleton) => <RoomCardSkeleton key={skeleton} />)}
      {rooms?.map((room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </SimpleGrid>
  );
};

export default RoomList;
