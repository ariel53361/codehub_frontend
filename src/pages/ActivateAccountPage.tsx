import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useActivateAccount from "../hooks/useActivateAccount";
import { useEffect } from "react";

const ActivateAccountPage = () => {
  const {
    mutate: activate,
    error,
    isLoading,
    isSuccess,
  } = useActivateAccount();

  const { uid, token } = useParams();
  useEffect(() => {
    if (!uid || !token) return;

    activate({ uid, token });
  }, [uid, token, activate]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isSuccess) return;

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSuccess, navigate]);

  return (
    <HStack justify="center" marginY="30px">
      <Card w="900px">
        <CardHeader
          bg="primaryPurple"
          h="20px"
          borderTopRadius="7px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        />
        <CardBody>
          <VStack spacing="16px" align="stretch">
            <Text fontSize="lg" fontWeight="bold">
              Activating your account…
            </Text>

            {isLoading ? (
              <HStack>
                <Spinner />
                <Text>Please wait…</Text>
              </HStack>
            ) : isSuccess ? (
              <VStack align="start" spacing="2">
                <Text color="green.500" fontWeight="bold">
                  Your account is activated ✅
                </Text>
                <Text color="gray.500" fontSize="sm">
                  You will be redirected to the login page shortly...
                </Text>
              </VStack>
            ) : error ? (
              <Text color="red.500">
                Activation failed. The link may be expired or already used.
              </Text>
            ) : (
              <Text>Ready.</Text>
            )}
          </VStack>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default ActivateAccountPage;
