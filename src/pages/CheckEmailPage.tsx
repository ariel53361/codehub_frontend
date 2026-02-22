import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import useResendActivation from "../hooks/useResendActivation";
import { useEffect, useState } from "react";
import { useActivationStore } from "../store/activationStore";
import { Navigate } from "react-router-dom";

const CheckEmailPage = () => {
  const { mutate: resendActivation, error, isLoading } = useResendActivation();

  const RESEND_COOLDOWN = 60;
  const [cooldown, setCooldown] = useState(0);

  const pendingEmail = useActivationStore((s) => s.pendingEmail);
  const nextResendAt = useActivationStore((s) => s.nextResendAt);
  const startResendCooldown = useActivationStore((s) => s.startResendCooldown);
  const clearResendCooldown = useActivationStore((s) => s.clearResendCooldown);

  useEffect(() => {
    if (!nextResendAt) {
      setCooldown(0);
      return;
    }

    const tick = () => {
      const remaining = Math.ceil((nextResendAt - Date.now()) / 1000);
      if (remaining <= 0) {
        setCooldown(0);
        clearResendCooldown();
      } else {
        setCooldown(remaining);
      }
    };

    tick();
    const id = setInterval(tick, 250);

    return () => clearInterval(id);
  }, [nextResendAt]);

  const resendEmail = (email: string) => {
    resendActivation(
      { email },
      {
        onSuccess: () => startResendCooldown(RESEND_COOLDOWN),
      },
    );
  };

  if (!pendingEmail) {
    return <Navigate to="/login" replace />;
  }

  return (
    <HStack justify="center" my="50px">
      <Card
        w="500px"
        color="gray.100"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="lg"
        overflow="hidden"
      >
        <CardHeader
          bg="primaryPurple"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          h="44px"
        >
          Check your email
        </CardHeader>

        <CardBody>
          <VStack align="center" spacing="16px">
            <VStack>
              <Text color="gray.200">We sent an activation link to:</Text>

              <Box
                w="fit-content"
                px={3}
                py={2}
                borderRadius="md"
                bg="whiteAlpha.200"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
              >
                <Text fontWeight="semibold" color="gray.100">
                  {pendingEmail}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.400" textAlign="center">
                If you don&apos;t see it, check your spam/junk folder.
              </Text>
            </VStack>
            <VStack textAlign="center" spacing="20px">
              <Text fontSize="sm" color="gray.400" textAlign="center">
                You can request another activation email.
                <br />
                If the email exists and the account is not activated yet,
                we&apos;ll send a new link.
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => resendEmail(pendingEmail)}
                isDisabled={isLoading || cooldown > 0}
                isLoading={isLoading}
                loadingText="Sending..."
              >
                Resend activation email
              </Button>
              {cooldown > 0 && (
                <Text fontSize="sm" color="gray.400">
                  You can resend again in{" "}
                  <Text as="span" fontWeight="bold" color="gray.200">
                    {cooldown}s
                  </Text>
                  .
                </Text>
              )}
            </VStack>
          </VStack>
          {error?.message && <Text fontSize="sm">{error.message}</Text>}
        </CardBody>
      </Card>
    </HStack>
  );
};

export default CheckEmailPage;
