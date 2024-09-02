import { Avatar, HStack, Text } from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import CodeHubAvatar from "./CodeHubAvatar";

const UserProfile = () => {
  const { user, clearAuthData } = useAuthStore();
  return (
    <HStack>
      {/* fix issue where the avatar is showen only if uses Avatar (not with CodeHubAvatar) */}
      <Avatar src={user?.avatar} size="sm" />
      {user?.username ? (
        <HStack gap={"30px"}>
          <Text whiteSpace={"nowrap"}>
            welcome <Link to={`/user-details/${user.id}`}>{user.username}</Link>
          </Text>
          <Text onClick={clearAuthData} cursor="pointer">
            Logout
          </Text>
        </HStack>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </HStack>
  );
};

export default UserProfile;
