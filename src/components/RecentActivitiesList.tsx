import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import RecentActivityCard from "./RecentActivityCard";
import useMessages from "../hooks/useMessages";

const RecentActivitiesList = () => {
  const { data } = useMessages();
  
  return (
    <Card borderRadius="10px">
      <CardHeader bg="#696d97" borderTopRadius="10px" height="30px">
        <Flex alignItems="center" height="100%">
          <Text color="white">RECENT ACTIVITIES</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        {data?.slice(0, 5).map((message) => (
          <RecentActivityCard message={message} key={message.id} />
        ))}
      </CardBody>
    </Card>
  );
};

export default RecentActivitiesList;
