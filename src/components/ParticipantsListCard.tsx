import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Text,
} from "@chakra-ui/react";
import User from "../entities/User";
import ParticipantDetails from "./ParticipantDetails";

interface Props {
  participantsNum: number;
  participants: User[];
}

const ParticipantsListCard = ({ participantsNum, participants }: Props) => {
  return (
    <Card>
      <CardHeader bg={"#696d97"} h={"2px"} borderTopRadius={"7px"}>
        <HStack h={"100%"}>
          <Box>PARTICIPANTS</Box>
          <Text fontSize={"sm"} fontWeight={"normal"} color={"#71c6dd"}>
            ({participantsNum} joined)
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        {participants.map((p) => (
          <ParticipantDetails key={"participantCard" + p.id} participant={p} />
        ))}
      </CardBody>
    </Card>
  );
};

export default ParticipantsListCard;
