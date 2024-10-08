import { Button, Text, VStack } from "@chakra-ui/react";
import useTopics from "../hooks/useTopics";
import useRoomQueryStore from "../store/roomQueryStore";

const TopicList = () => {
  const selectedTopic = useRoomQueryStore((s) => s.roomQuery.topic);
  const onSelectTopic = useRoomQueryStore((s) => s.setTopic);
  const resetRoomQuery = useRoomQueryStore((s) => s.resetRoomQuery);
  const { data } = useTopics();

  return (
    <VStack spacing="30px" align="start">
      <Text>BROWSE TOPICS</Text>
      <Button
        fontWeight={selectedTopic ? "normal" : "bold"}
        textColor={selectedTopic ? "" : "#71c6dd"}
        onClick={() => {
          onSelectTopic(null);
          resetRoomQuery();
        }}
        variant="link"
      >
        All
      </Button>
      {data?.results.map((topic) => (
        <Button
          fontWeight={topic.id === selectedTopic?.id ? "bold" : "normal"}
          textColor={topic.id === selectedTopic?.id ? "#71c6dd" : ""}
          onClick={() => {
            onSelectTopic(topic);
          }}
          variant="link"
          key={topic.id}
        >
          {topic.name} ({topic.room_num})
        </Button>
      ))}
    </VStack>
  );
};

export default TopicList;
