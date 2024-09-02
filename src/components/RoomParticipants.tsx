import { Avatar, Text } from "@chakra-ui/react";
import User from "../entities/User";
import CodeHubAvatar from "./CodeHubAvatar";

const MAX_PARTICIPANTS_NUM = 12;

interface Props {
  participants: User[];
}

const RoomParticipants = ({ participants }: Props) => {
  return (
    <>
      {participants.slice(0, MAX_PARTICIPANTS_NUM).map((participant) => (
        // need to fix: should send all participants witout the room opener
        <CodeHubAvatar
          key={"roomParticipants" + participant.id}
          user={participant}
          additionalAttributes={{ size: "xs" }}
        />
      ))}
      {participants.length > MAX_PARTICIPANTS_NUM && (
        <Text fontWeight={"bold"}>...</Text>
      )}
    </>
  );
};

export default RoomParticipants;
