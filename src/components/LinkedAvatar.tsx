import { AvatarProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserAvatar } from "./UserAvatar";
import { Profile } from "../entities/Profile";

interface Props extends Omit<AvatarProps, "src"> {
  profile: Profile;
}

const LinkedAvatar = ({ profile, ...avatarProps }: Props) => {
  return (
    <Link to={`/user-details/${profile.id}`}>
      <UserAvatar src={profile.avatar} {...avatarProps} />
    </Link>
  );
};

export default LinkedAvatar;
