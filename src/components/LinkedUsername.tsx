import { Link } from "react-router-dom";
import { User } from "../entities/User";
import { Text } from "@chakra-ui/react";

interface Props {
  user: User;
  isHighlighted?: boolean;
}

const LinkedUsername = ({ user, isHighlighted = false }: Props) => {
  return (
    <Link to={`/user-details/${user.id}`}>
      <Text color={isHighlighted ? "primaryBlue" : undefined}>
        {user.username}
      </Text>
    </Link>
  );
};

export default LinkedUsername;
