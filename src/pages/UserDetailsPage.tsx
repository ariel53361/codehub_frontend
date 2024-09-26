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
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import useAuthStore from "../store/authStore";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const { data: user, error, isLoading } = useUser(userId!);
  const currentUser = useAuthStore((s) => s.user);


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
          {user?.username}
        </CardHeader>
        <CardBody>
          <HStack justify={"center"}>
            <Avatar src={user?.avatar} size={"xl"} />
          </HStack>
          <VStack align={"start"} spacing={"10px"} marginTop={"10px"}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={user?.username}
              readOnly={true}
            ></Input>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" value={user?.email}></Input>

            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input id="firstName" type="text" value={user?.first_name}></Input>

            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input id="lastName" type="text" value={user?.last_name}></Input>

            <FormLabel htmlFor="avatar">Avatar</FormLabel>
            <Input id="avatar" type="file" accept="image/*"></Input>

            <HStack justify={"center"} w={"100%"} marginTop={"20px"}>
              <VStack spacing={"20px"}>
                {error && <Text>{error.message}</Text>}
                {isLoading && <Spinner />}
                {currentUser?.id === user?.id && (
                  <Button type="submit">Update</Button>
                )}
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </HStack>
  );
};

export default UserDetailsPage;
