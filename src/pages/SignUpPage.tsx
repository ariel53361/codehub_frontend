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
import { createUserSchema } from "../schemas/userSchema";
import { registerFormFields } from "../forms/formFields";
import { useForm } from "react-hook-form";
import { CreateUserProfileFormValues } from "../forms/UserProfileFormValues";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import useRegister from "../hooks/useRegister";
import { useActivationStore } from "../store/activationStore";

const SignUpPage = () => {
  const navigate = useNavigate();

  const formFields = registerFormFields;
  const {
    mutate: registerUser,
    error: registerErrors,
    isLoading,
  } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<CreateUserProfileFormValues>({
    resolver: zodResolver(createUserSchema),
  });

  const setPendingEmail = useActivationStore((s) => s.setPendingEmail);
  const onSubmit = (formData: CreateUserProfileFormValues) => {
    registerUser(formData, {
      onSuccess: () => {
        setPendingEmail(formData.email);
        navigate("/check-email", { state: { email: formData.email } });
      },
    });
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"500px"}>
        <CardHeader
          bg={"primaryBlue"}
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
              <ApiErrorDisplay error={registerErrors} />
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
