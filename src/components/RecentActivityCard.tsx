import { Box, Card, CardBody, Flex, HStack, Text, Textarea } from "@chakra-ui/react";
import { Message } from "../entities/Message";
import FormatedDate from "./FormatedDate";
import { Link } from "react-router-dom";
import LinkedAvatar from "./LinkedAvatar";

interface Props {
  message: Message;
}

const RecentActivitiesCard = ({ message }: Props) => {
  return (
    <>
      <Card border={"1px solid gray"} margin={"7px"}>
        <CardBody>
          <HStack>
            <Flex>
              <LinkedAvatar profile={message.profile} />
            </Flex>
            <Flex direction="column">
              <Link to={`/user-details/${message.profile.id}`}>
                {/* <Text color={"primaryBlue"}>{message.user.username}</Text> */}
              </Link>
              <FormatedDate
                date={message.created}
                color="darkGray"
                fontSize="xs"
              />
              <Text color="lightGray" fontSize={"sm"}>
                replied to post{" "}
              </Text>
              <Box mb={'5px'}>
                <Link to={`/room/${message.room.id}`}>
                  <Text color="primaryBlue">"{message.room.subject}"</Text>
                </Link>
              </Box>
            </Flex>
          </HStack>
          <Textarea
            value={message.content}
            readOnly={true}
            borderRadius="3px"
            bg="#2d2d39"
            color="#b2bdbd"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default RecentActivitiesCard;
