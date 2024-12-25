import { HStack, SimpleGrid } from "@chakra-ui/react";
import RoomCard from "./RoomCard";
import RoomCardSkeleton from "./RoomCardSkeleton";
import useRooms from "../hooks/useRooms";
import useRoomQueryStore from "../store/roomQueryStore";
import Pagination from "./Pagination";
import ApiErrorDisplay from "./ApiErrorDisplay";

const RoomList = () => {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const page = useRoomQueryStore((s) => s.roomQuery.page);
  const setPage = useRoomQueryStore((s) => s.setPage);
  const { data, error, isLoading } = useRooms({ ...roomQuery, page });
  const skeletons = [1, 2, 3];
  if (error) return <ApiErrorDisplay error={error} />;
  return (
    <>
      <SimpleGrid gap={6}>
        {isLoading &&
          skeletons.map((skeleton) => <RoomCardSkeleton key={skeleton} />)}
        {data?.results.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </SimpleGrid>
      <HStack marginTop={"20px"}>
        {data && (
          <Pagination
            currentPage={page}
            totalCount={data.count}
            onPageChange={setPage}
          />
        )}
      </HStack>
    </>
  );
};

export default RoomList;
