import { Text } from "@chakra-ui/react";
import LinkedAvatar from "./LinkedAvatar";
import { Profile } from "../entities/Profile";

const maxParticipants = 12;

interface Props {
  participants: Profile[];
}

const RoomParticipants = ({ participants }: Props) => {
  return (
    <>
      {participants.slice(0, maxParticipants).map((participant) => (
        <LinkedAvatar
          key={"roomParticipants" + participant.id}
          profile={participant}
        />
      ))}
      {participants.length > maxParticipants && (
        <Text fontWeight={"bold"}>...</Text>
      )}
    </>
  );
};

export default RoomParticipants;
