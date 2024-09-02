import { Text } from "@chakra-ui/react";

interface Props {
  username?: string;
}

const Username = ({ username }: Props) => {
  return (
    <Text fontWeight={"normal"} color={"#71c6dd"}>
      @{username}
    </Text>
  );
};

export default Username;
