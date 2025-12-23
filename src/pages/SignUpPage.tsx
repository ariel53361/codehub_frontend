import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../hooks/useCreateUser";
import { createUserSchema } from "../schemas/userSchema";
import { baseFormFields } from "../forms/formFields";
import { FieldValues, useForm } from "react-hook-form";
import { CreateUserProfileFormValues } from "../forms/UserProfileFormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import useRegisterWithAutoLogin from "../hooks/useCreateUser";

const SignUpPage = () => {
  const navigate = useNavigate();

  const formFields = baseFormFields;
  const {
    mutate: registerAndLogin,
    error: registerAndLoginErrors,
    isLoading,
  } = useRegisterWithAutoLogin(() => {
    navigate("/");
  });
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<CreateUserProfileFormValues>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (formData: CreateUserProfileFormValues) => {
    registerAndLogin(formData);
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"500px"}>
        <CardHeader
          bg={"primaryPurple"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          Sign Up
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="4" align="start">
              {formFields.map((field) => (
                <Box key={field.id} w="100%">
                  <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                  <Input
                    {...register(field.id)}
                    id={field.id}
                    type={field.type}
                    accept={field.accept}
                  />
                  {validationErrors[field.id] && (
                    <Text color="red">
                      {validationErrors[field.id]?.message}
                    </Text>
                  )}
                </Box>
              ))}
              <ApiErrorDisplay error={registerAndLoginErrors} />
              <HStack justify="center" w="100%" spacing="4">
                <Button type="submit" isDisabled={isLoading}>
                  Sign Up
                </Button>
              </HStack>
              {isLoading && <Spinner />}
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default SignUpPage;
