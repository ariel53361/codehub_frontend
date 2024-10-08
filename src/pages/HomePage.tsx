import {
  Grid,
  GridItem,
  Show,
  HStack,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import RecentActivitiesList from "../components/RecentActivitiesList";
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
        lg: `"asideLeft main asideRight"`,
      }}
      gap={"20px"}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr 350px",
      }}
    >
      <Show above="lg">
        <GridItem area="asideLeft">
          <TopicList />
        </GridItem>
        <GridItem area="asideRight">
          <RecentActivitiesList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Heading as={"h1"}>{selectedTopic?.name} Rooms</Heading>
        <HStack marginY={"10px"} justifyContent={"space-between"}>
          <SortSelector />
          <Button onClick={() => navigate("/create-room")} bg="#71c6dd">
            + Create Room
          </Button>
        </HStack>
        <RoomList />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
