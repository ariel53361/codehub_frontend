import {
  Avatar,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Message from "../entities/Message";
import FormatedDate from "./FormatedDate";
import { Link } from "react-router-dom";
import CodeHubAvatar from "./CodeHubAvatar";

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
              <CodeHubAvatar
                user={message.user}
                additionalAttributes={{ size: "sm" }}
              />
            </Flex>
            <Flex direction="column">
              <Link to={`/user-details/${message.user.id}`}>
                <Text color={"#71c6dd"}>{message.user.username}</Text>
              </Link>
              <FormatedDate
                date={message.created}
                optionalAttributes={{ color: "#8b8b8b", fontSize: "xs" }}
              />
              <Text color="#b2bdbd" fontSize={"sm"}>
                replied to post{" "}
              </Text>
              <Link to={`/room/${message.room.id}`}>
                <Text color="#71c6dd">"{message.room.subject}"</Text>
              </Link>
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
