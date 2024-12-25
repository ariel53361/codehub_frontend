import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "../entities/User";
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
          <Text fontSize={"sm"} fontWeight={"normal"} color={"primaryBlue"}>
            ({participantsNum} joined)
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack spacing={'7px'}>
          {participants.map((p) => (
            <ParticipantDetails
              key={"participantCard" + p.id}
              participant={p}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ParticipantsListCard;
