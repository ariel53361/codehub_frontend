import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
import useTopics from "../hooks/useTopics";
import useRoomQueryStore from "../store/roomQueryStore";

const TopicList = () => {
  const selectedTopic = useRoomQueryStore((s) => s.roomQuery.topic);
  const onSelectTopic = useRoomQueryStore((s) => s.setTopic);
  const resetRoomQuery = useRoomQueryStore((s) => s.resetRoomQuery);
  const { data, isLoading } = useTopics();

  if (isLoading) return <Spinner />;
  return (
    <VStack spacing="30px" align="start" mt="12px">
      <Text>BROWSE TOPICS</Text>

      <Button
        fontWeight={selectedTopic ? "normal" : "bold"}
        textColor={selectedTopic ? "" : "highlightedText"}
        onClick={() => {
          onSelectTopic(null);
          resetRoomQuery();
        }}
        variant="link"
        justifyContent={"start"}
      >
        All
      </Button>

      {data?.results.map((topic) => (
        <Button
          fontWeight={topic.id === selectedTopic?.id ? "bold" : "normal"}
          textColor={topic.id === selectedTopic?.id ? "highlightedText" : ""}
          onClick={() => {
            onSelectTopic(topic);
          }}
          variant="link"
          justifyContent={"start"}
          key={topic.id}
        >
          {topic.name} ({topic.room_num})
        </Button>
      ))}
    </VStack>
  );
};

export default TopicList;
