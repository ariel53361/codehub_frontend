import { Grid, GridItem, Show } from "@chakra-ui/react";
import ChatCard from "../components/ChatCard";
import ParticipantsListCard from "../components/ParticipantsListCard";
import useRoom from "../hooks/useRoom";
import { useParams } from "react-router-dom";
import ApiErrorDisplay from "../components/ApiErrorDisplay";

const RoomPage = () => {
  const { roomId } = useParams();
  const { data: room, error } = useRoom(roomId!);

  if(error) return <ApiErrorDisplay error={error}/>
  if (!room) return null;

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"main participants"`,
      }}
      gap="20px"
      templateColumns={{
        base: "1fr",
        lg: "1fr 250px",
      }}
    >
    <GridItem pl="2" area={"main"}>
        <ChatCard room={room} />
      </GridItem>
      <Show above="lg">
        <GridItem pl="2" area={"participants"}>
          <ParticipantsListCard
            participantsNum={room.participants_num}
            participants={room.participants}
          />
        </GridItem>
      </Show>
    </Grid>
  );
};

export default RoomPage;
