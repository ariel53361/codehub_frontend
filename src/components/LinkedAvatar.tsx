import { AvatarProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { User } from "../entities/User";
import { UserAvatar } from "./UserAvatar";

interface Props extends Omit<AvatarProps, "src"> {
  user: User;
}

const LinkedAvatar = ({ user, ...avatarProps }: Props) => {
  return (
    <Link to={`/user-details/${user.id}`}>
      <UserAvatar src={user.avatar} {...avatarProps} />
    </Link>
  );
};

export default LinkedAvatar;
