import { Text } from "@chakra-ui/react";
import { User } from "../entities/User";
import LinkedAvatar from "./LinkedAvatar";

const maxParticipants = 12;

interface Props {
  participants: User[];
}

const RoomParticipants = ({ participants }: Props) => {
  return (
    <>
      {participants.slice(0, maxParticipants).map((participant) => (
        <LinkedAvatar
          key={"roomParticipants" + participant.id}
          user={participant}
        />
      ))}
      {participants.length > maxParticipants && (
        <Text fontWeight={"bold"}>...</Text>
      )}
    </>
  );
};

export default RoomParticipants;
