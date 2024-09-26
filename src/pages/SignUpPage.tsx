import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useCreateUser from "../hooks/useCreateUser";
import PostUser from "../entities/PostUser";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must have at least 5 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z
    .any()
    .optional()
    .refine((file: File) => file instanceof Object, "Avatar must be a file")
    .nullable(),
});

export type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    mutate,
    error: serverErrors,
    isLoading,
  } = useCreateUser(() => navigate("/login"));

  const onSubmit = (data: FieldValues) => {
    
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    
    const file = data.avatar?.[0];
    if (file) formData.append("avatar", file);

    mutate(formData as unknown as PostUser);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  
  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"900px"}>
        <CardHeader
          bg={"#696d97"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          SIGN UP
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="20px" align={"start"}>
              <Box w={"100%"}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input {...register("username")} id="username" type="text" />
                {errors.username && <Text>{errors.username.message}</Text>}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...register("email")} id="email" type="text" />
                {errors.email && <Text>{errors.email.message}</Text>}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
                {errors.password && <Text>{errors.password.message}</Text>}
              </Box>
              {/* <FormControl id="confirmPassword" isRequired>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input id="confirmPassword" type="password" />
              </FormControl> */}
              <Box w={"100%"}>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
                <Input
                  {...register("first_name")}
                  id="first_name"
                  type="text"
                />
                {errors.first_name && <Text>{errors.first_name.message}</Text>}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <Input {...register("last_name")} id="last_name" type="text" />
                {errors.last_name && <Text>{errors.last_name.message}</Text>}
              </Box>
              <Box w={"100%"}>
                <FormLabel htmlFor="avatar">Avatar</FormLabel>
                <Input
                  {...register("avatar")}
                  id="avatar"
                  type="file"
                  accept="image/*"
                />
                {errors.avatar && errors.avatar.message && (
                  <Text>{errors.avatar.message?.toString()}</Text>
                )}
              </Box>
              <HStack justify={"center"} w={"100%"}>
                <Button type="submit" colorScheme="blue" width="100px">
                  Register
                </Button>
              </HStack>
              {/* {serverErrors?.response?.data.map(())} */}
            </VStack>
          </form>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default SignUpPage;

