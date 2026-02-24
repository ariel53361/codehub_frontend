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
import { zodResolver } from "@hookform/resolvers/zod";
import { setPasswordSchema } from "../schemas/userSchema";
import { setPasswordFormField } from "../forms/formFields";

export const SetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
  });

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
              {setPasswordFormField.map((field) => (
                <Box w={"100%"}>
                  <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                  <Input
                    {...register(field.id)}
                    id={field.id}
                    type={field.type}
                    name={field.id}
                  />
                  {validationErrors[field.id] && (
                    <Text color="red">
                      {validationErrors[field.id]?.message}
                    </Text>
                  )}
                </Box>
              ))}
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
