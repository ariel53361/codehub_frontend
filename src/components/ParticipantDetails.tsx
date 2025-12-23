import { HStack, VStack } from "@chakra-ui/react";
import LinkedAvatar from "./LinkedAvatar";
import LinkedUsername from "./LinkedUsername";
import { Profile } from "../entities/Profile";

interface Props {
  participant: Profile;
}
const ParticipantDetails = ({ participant }: Props) => {
  return (
    <HStack spacing={"12px"}>
      <LinkedAvatar profile={participant} />
      <VStack spacing={"0px"} align={"start"}>
        <LinkedUsername profile={participant} isHighlighted={true} />
      </VStack>
    </HStack>
  );
};

export default ParticipantDetails;
