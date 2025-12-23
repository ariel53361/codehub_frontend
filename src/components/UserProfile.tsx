import { Button, HStack, Text } from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import LinkedAvatar from "./LinkedAvatar";
import { UserAvatar } from "./UserAvatar";

const UserProfile = () => {
  const profile = useAuthStore((s) => s.profile);
  const clearAuthData = useAuthStore((s) => s.clearAuthData);
  const navigate = useNavigate();

  return (
    <HStack>
      {profile ? (
        <LinkedAvatar
          profile={profile}
        />
      ) : (
        <UserAvatar />
      )}
      {profile?.user.username ? (
        <HStack gap={"30px"}>
          <Text whiteSpace={"nowrap"}>
            welcome{" "}
            <Link to={`/user-details/${profile.id}`}>
              {profile?.user.username}
            </Link>
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
