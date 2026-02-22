import {
  Grid,
  GridItem,
  Show,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import RoomList from "../components/RoomList";
import SortSelector from "../components/SortSelector";
import TopicList from "../components/TopicList";
import { useNavigate } from "react-router-dom";
import useRoomQueryStore from "../store/roomQueryStore";

const HomePage = () => {
  const selectedTopic = useRoomQueryStore((s) => s.roomQuery.topic);
  const navigate = useNavigate();

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"asideLeft main"`,
      }}
      gap="20px"
      templateColumns={{
        base: "1fr",
        lg: "140px 1fr",
      }}
      alignItems="start"
    >
      <Show above="lg">
        <GridItem area="asideLeft">
          <TopicList />
        </GridItem>
      </Show>

      <GridItem area="main">
        <Heading as="h1">{selectedTopic?.name} Rooms</Heading>

        <HStack marginY="10px" justifyContent="space-between">
          <SortSelector />
          <Button onClick={() => navigate("/create-room")} bg="primaryBlue">
            + Create Room
          </Button>
        </HStack>

        <RoomList />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
