import {
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuthStore from "../store/authStore";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";
import User from "../entities/User";
import schema, { type FormData } from "../services/user-schema";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const { data: user, error: fetchingUserError, isLoading } = useUser(userId!);
  const currentUser = useAuthStore((s) => s.user);
  const [updateFlag, setUpdateFlag] = useState(false);
  const navigate = useNavigate();
  const {
    mutate,
    error: updateError,
    isLoading: isUpdating,
  } = useUpdateUser(userId!, () => navigate("/"));

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("first_name", user.first_name);
      setValue("last_name", user.last_name);
    }
  }, [user]);

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);

    const file = data.avatar?.[0];
    if (file) formData.append("avatar", file);

    mutate(formData as unknown as User);
  };

  return (
    <HStack justify={"center"} marginY={"30px"}>
      <Card w={"500px"}>
        <CardHeader
          bg={"#696d97"}
          h={"20px"}
          borderTopRadius={"7px"}
          display={"flex"}
          justifyContent="center"
          alignItems="center"
        >
          {user?.username || "Loading..."}
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack justify={"center"}>
              <Avatar src={user?.avatar} size={"xl"} />
            </HStack>
            <VStack align={"start"} spacing={"10px"} marginTop={"10px"}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                {...register("username")}
                id="username"
                type="text"
                disabled={!updateFlag}
              />
              {errors.username?.message && (
                <Text color="red">{errors.username.message}</Text>
              )}

              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...register("password")}
                id="password"
                type="password"
                disabled={!updateFlag}
              />
              {errors.password?.message && (
                <Text color="red">{errors.password.message}</Text>
              )}

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                disabled={!updateFlag}
              />
              {errors.email?.message && (
                <Text color="red">{errors.email.message}</Text>
              )}

              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                {...register("first_name")}
                id="first_name"
                type="text"
                disabled={!updateFlag}
              />
              {errors.first_name?.message && (
                <Text color="red">{errors.first_name.message}</Text>
              )}

              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                {...register("last_name")}
                id="last_name"
                type="text"
                disabled={!updateFlag}
              />
              {errors.last_name?.message && (
                <Text color="red">{errors.last_name.message}</Text>
              )}
              <FormLabel htmlFor="avatar">Avatar</FormLabel>
              <Input
                {...register("avatar")}
                id="avatar"
                type="file"
                accept="image/*"
                disabled={!updateFlag}
              />
              <HStack justify={"center"} w={"100%"} marginTop={"20px"}>
                <VStack spacing={"20px"}>
                  {fetchingUserError && (
                    <Text color="red">{fetchingUserError.message}</Text>
                  )}
                  {isLoading && <Spinner />}
                  {isUpdating && <Spinner />}
                  {currentUser?.id === user?.id && (
                    <>
                      <Button
                        onClick={() => setUpdateFlag(true)}
                        isDisabled={updateFlag}
                      >
                        Edit
                      </Button>
                      <Button isDisabled={!updateFlag} type="submit">
                        Submit
                      </Button>
                    </>
                  )}
                </VStack>
              </HStack>
            </VStack>
          </form>
          {updateError && <Text>{updateError.message}</Text>}
        </CardBody>
      </Card>
    </HStack>
  );
};

export default UserDetailsPage;
