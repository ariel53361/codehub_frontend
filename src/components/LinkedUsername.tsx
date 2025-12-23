import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Profile } from "../entities/Profile";

interface Props {
  profile: Profile;
  isHighlighted?: boolean;
}

const LinkedUsername = ({ profile, isHighlighted = false }: Props) => {
  return (
    <Link to={`/user-details/${profile.id}`}>
      <Text color={isHighlighted ? "primaryBlue" : undefined}>
        {profile.user.username}
      </Text>
    </Link>
  );
};

export default LinkedUsername;
