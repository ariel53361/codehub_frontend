import { Avatar, AvatarProps } from "@chakra-ui/react";
import { BASE_URL } from "../constants/api";
import { DEFAULT_AVATAR_URL } from "../constants/defaultAvatarUrl";

interface Props extends AvatarProps {}

export const UserAvatar = ({ src, size = "sm", ...props }: Props) => {
  const fullPath = src ? `${BASE_URL}${src}` : DEFAULT_AVATAR_URL;


  return <Avatar {...props} src={fullPath} size={size} />;
};
