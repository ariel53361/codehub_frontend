import { Button, HStack, Text } from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import LinkedAvatar from "./LinkedAvatar";
import { UserAvatar } from "./UserAvatar";

const UserProfile = () => {
  const user = useAuthStore((s) => s.user);
  const clearAuthData = useAuthStore((s) => s.clearAuthData);
  const navigate = useNavigate();

  return (
    <HStack>
      {user ? <LinkedAvatar user={user} /> : <UserAvatar />}

      {user?.username ? (
        <HStack gap={"30px"}>
          <Text whiteSpace={"nowrap"}>
            welcome <Link to={`/user-details/${user.id}`}>{user.username}</Link>
          </Text>
          <Button
            variant="link"
            onClick={() => {
              clearAuthData();
              navigate("/");
            }}
          >
            Logout
          </Button>
        </HStack>
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </HStack>
  );
};

export default UserProfile;
