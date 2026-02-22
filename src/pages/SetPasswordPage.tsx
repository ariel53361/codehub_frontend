import {
  HStack,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
  Input,
  FormLabel,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SetPasswordFormValues } from "../forms/UserProfileFormValues";
import useSetPassword from "../hooks/useSetPassword";
import { useNavigate } from "react-router-dom";
import ApiErrorDisplay from "../components/ApiErrorDisplay";

export const SetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<SetPasswordFormValues>();

  const { mutate: setPassword, error: error, isLoading } = useSetPassword();

  const navigate = useNavigate();

  const onSubmit = (data: SetPasswordFormValues) => {
    setPassword(data, { onSuccess: () => navigate("/") });
  };
  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"400px"}>
        <CardHeader
          bg={"primaryBlue"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          SET PASSWORD
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="20px">
              <Box w={"100%"}>
                <FormLabel htmlFor="current_password">
                  Current Password
                </FormLabel>
                <Input
                  {...register("current_password")}
                  id="current_password"
                  type="password"
                  name="current_password"
                />
                {validationErrors["current_password"] && (
                  <Text color="red">
                    {validationErrors["current_password"]?.message}
                  </Text>
                )}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="new_password">New Password</FormLabel>
                <Input
                  {...register("new_password")}
                  id="new_password"
                  type="password"
                  name="new_password"
                />
                {validationErrors["new_password"] && (
                  <Text color="red">
                    {validationErrors["new_password"]?.message}
                  </Text>
                )}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="re_new_password">
                  Confirm New Password
                </FormLabel>
                <Input
                  {...register("re_new_password")}
                  id="re_new_password"
                  type="password"
                  name="re_new_password"
                />
                {validationErrors["re_new_password"] && (
                  <Text color="red">
                    {validationErrors["re_new_password"]?.message}
                  </Text>
                )}
              </Box>
              <Button
                isLoading={isLoading}
                type="submit"
                colorScheme="blue"
                width="100px"
              >
                Submit
              </Button>
              <ApiErrorDisplay error={error} />
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};
