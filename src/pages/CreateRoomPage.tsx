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
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useTopics from "../hooks/useTopics";
import Topic from "../entities/Topic";
import { useState } from "react";
import useCreateRoom from "../hooks/useCreateRoom";
import { useNavigate } from "react-router-dom";

const CreateRoomPage = () => {
  const { data } = useTopics();
  const [selectedTopic, setSelectedTopic] = useState<Topic | undefined>();
  const [subject, setSubject] = useState<string | undefined>();
  const navigate = useNavigate();
  const { mutate, error, isLoading } = useCreateRoom(()=>navigate("/"));
  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTopic && subject) {
      const newRoom = {
        topic: selectedTopic,
        subject,
        description:""
      };
      mutate(newRoom);
    }
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"900px"}>
        <CardHeader
          bg={"#696d97"}
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
                    {data?.results.map((topic) => (
                      <MenuItem
                        onClick={() => setSelectedTopic(topic)}
                        key={topic.id}
                        value={topic.name}
                      >
                        {topic.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input
                  onChange={(e) => setSubject(e.currentTarget.value)}
                  id="subject"
                  type="text"
                />
              </Box>
              {/* <Box w={"100%"}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input id="description" type="text" />
              </Box> */}
              <HStack justify={"center"} w={"100%"}>
                <Button type="submit" colorScheme="blue" width="100px">
                  Create
                </Button>
              </HStack>
              {error && <Text>{error.message}</Text>}
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default CreateRoomPage;
