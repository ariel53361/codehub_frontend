import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Box,
  FormLabel,
  Input,
  Button,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useTopics from "../hooks/useTopics";
import Topic from "../entities/Topic";
import { useState } from "react";
import useCreateRoom from "../hooks/useCreateRoom";
import { useNavigate } from "react-router-dom";
import ApiErrorDisplay from "../components/ApiErrorDisplay";

const CreateRoomPage = () => {
  const { data: topics, error: fetchTopicsError } = useTopics();
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>();
  const [subject, setSubject] = useState<string | undefined>();
  const navigate = useNavigate();
  const {
    mutate: createRoom,
    error: createRoomError,
    isLoading,
  } = useCreateRoom(() => navigate("/"));
  const [validationErrors, setValidationErrors] = useState({
    topic: "",
    subject: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidationErrors({ topic: "", subject: "" });

    if (!selectedTopic) {
      setValidationErrors((prev) => ({
        ...prev,
        topic: "Please select a topic",
      }));
      return;
    }
    const trimmedSubject = subject?.trim();
    if (
      !trimmedSubject ||
      trimmedSubject.length < 2 ||
      trimmedSubject.length > 200
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        subject: "Subject must be between 2 and 200 characters",
      }));
      return;
    }
    const newRoom = {
      topic: selectedTopic,
      subject: subject!,
      description: "",
    };

    createRoom(newRoom);
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"900px"}>
        <CardHeader
          bg={"primaryPurple"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          CREATE ROOM
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing="20px" align={"start"} w={"100%"}>
              <Box>
                <Menu>
                  <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                    {selectedTopic?.name || "Select Topic"}
                  </MenuButton>
                  <MenuList>
                    {topics?.results.map((topic) => (
                      <MenuItem
                        onClick={() => {
                          setSelectedTopic(topic);
                          setValidationErrors({ topic: "", subject: "" });
                        }}
                        key={topic.id}
                        value={topic.name}
                      >
                        {topic.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
                {validationErrors.topic && (
                  <Text color={"red"}>{validationErrors.topic}</Text>
                )}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                  onChange={(e) => {
                    setSubject(e.currentTarget.value);
                    setValidationErrors({ topic: "", subject: "" });
                  }}
                  id="subject"
                  type="text"
                />
              </Box>
              {validationErrors.subject && (
                <Text color={"red"}>{validationErrors.subject}</Text>
              )}

              <HStack justify={"center"} w={"100%"}>
                <Button type="submit" colorScheme="blue" width="100px">
                  Create
                </Button>
              </HStack>
              <ApiErrorDisplay error={fetchTopicsError} />
              <ApiErrorDisplay error={createRoomError} />
            </VStack>
          </form>
          {isLoading && <Spinner />}
        </CardBody>
      </Card>
    </HStack>
  );
};

export default CreateRoomPage;
