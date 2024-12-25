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
import { baseFormFields } from "../constants/formFields";
import { FieldValues, useForm } from "react-hook-form";
import { UserPayload } from "../entities/User";
import { zodResolver } from "@hookform/resolvers/zod";
import ApiErrorDisplay from "../components/ApiErrorDisplay";

const SignUpPage = () => {
  const navigate = useNavigate();

  const formFields = baseFormFields;
  const {
    mutate: createUser,
    error: createUserErrors,
    isLoading,
  } = useCreateUser(() => {
    navigate("/login");
  });
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<UserPayload>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = (formData: FieldValues) => {
    const userFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "avatar") {
        if (value instanceof File) {
          userFormData.append("avatar", value);
        } 
      } else {
        if (value !== undefined) {
          userFormData.append(key, value);
        }
      }
    });
    createUser(userFormData);
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
              <ApiErrorDisplay error={createUserErrors}/>
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
