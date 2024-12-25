import { HStack, VStack } from "@chakra-ui/react";
import { User } from "../entities/User";
import LinkedAvatar from "./LinkedAvatar";
import LinkedUsername from "./LinkedUsername";

interface Props {
  participant: User;
}
const ParticipantDetails = ({ participant }: Props) => {
  return (
    <HStack spacing={"12px"}>
      <LinkedAvatar user={participant} />
      <VStack spacing={"0px"} align={"start"}>
        <LinkedUsername user={participant} isHighlighted={true} />
      </VStack>
    </HStack>
  );
};

export default ParticipantDetails;
