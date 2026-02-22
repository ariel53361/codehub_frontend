import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import useAuthStore from "../store/authStore";
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import AuthAPIClient from "../services/authApiClient";

const ResetPasswordPage = () => {
  const accessToken = useAuthStore((s) => s.accessToken);
  const email = useAuthStore((s) => s.profile?.user.email);

  if (!accessToken || !email) return <Navigate to="/login" />;

  const apiClient = new AuthAPIClient();
  const { uid, token } = useParams();
  useEffect(() => {
    if (!uid || !token) return;
  }, [uid, token]);

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"900px"}>
        <CardHeader
          bg={"primaryBlue"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          RESET PASSWORD
        </CardHeader>
        <CardBody>
          <form onSubmit={() => apiClient.resetPassword(email)}>
            <VStack spacing="20px" align={"start"} w={"100%"}>
              <HStack justify={"center"} w={"100%"}>
                <Button type="submit" colorScheme="blue" width="100px">
                  Submit
                </Button>
              </HStack>
              {/* <ApiErrorDisplay error={fetchTopicsError} />
              <ApiErrorDisplay error={createRoomError} /> */}
            </VStack>
          </form>
          {/* {isLoading && <Spinner />} */}
        </CardBody>
      </Card>
    </HStack>
  );
};

export default ResetPasswordPage;
