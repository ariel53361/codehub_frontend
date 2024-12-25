import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import RecentActivityCard from "./RecentActivityCard";
import useMessages from "../hooks/useMessages";
import ApiErrorDisplay from "./ApiErrorDisplay";

const RecentActivitiesList = () => {
  const { data, error } = useMessages();

  return (
    <Card borderRadius="10px">
      <CardHeader bg="primaryPurple" borderTopRadius="10px" height="30px">
        <Flex alignItems="center" height="100%">
          <Text color="white">RECENT ACTIVITIES</Text>
        </Flex>
      </CardHeader>
      <CardBody>
        {data?.results.slice(0, 5).map((message) => (
          <RecentActivityCard message={message} key={message.id} />
        ))}
        <ApiErrorDisplay error={error} />
      </CardBody>
    </Card>
  );
};

export default RecentActivitiesList;
