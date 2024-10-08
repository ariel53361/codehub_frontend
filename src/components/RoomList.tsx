import { Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import RoomCard from "./RoomCard";
import RoomCardSkeleton from "./RoomCardSkeleton";
import useRooms from "../hooks/useRooms";
import useRoomQueryStore from "../store/roomQueryStore";

const RoomList = () => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const pageSize = useRoomQueryStore((s) => s.roomQuery.pageSize);
  const page = useRoomQueryStore((s) => s.roomQuery.page);
  const setPage = useRoomQueryStore((s) => s.setPage);
  const { data, error, isLoading } = useRooms({ ...roomQuery, page, pageSize });
  const skeletons = [1, 2, 3];
  if (error) return <Text>{error.message}</Text>;

  return (
    <>
      <SimpleGrid gap={6}>
        {isLoading &&
          skeletons.map((skeleton) => <RoomCardSkeleton key={skeleton} />)}
        {data?.results.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </SimpleGrid>
      <HStack marginTop={"5px"}>
        <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
          Previous
        </Button>
        <Button
          onClick={() => setPage(page + 1)}
          isDisabled={data?.next === null}
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default RoomList;
