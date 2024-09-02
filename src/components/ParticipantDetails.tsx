import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import User from "../entities/User";
import Username from "./Username";
import CodeHubAvatar from "./CodeHubAvatar";

interface Props {
  participant: User;
}
const ParticipantDetails = ({ participant }: Props) => {
  return (
    <HStack spacing={'12px'}>
      <CodeHubAvatar
        user={participant}
        additionalAttributes={{ size: "sm" }}
      />
      <VStack spacing={"0px"} align={"start"}>
        <Text color={"#b2bdbd"}>
          {participant.first_name} {participant.last_name}
        </Text>
        <Username username={participant.username} />
      </VStack>
    </HStack>
  );
};

export default ParticipantDetails;
