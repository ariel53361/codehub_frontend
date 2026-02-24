import { FormEvent, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import ApiErrorDisplay from "../components/ApiErrorDisplay";
import { useActivationStore } from "../store/activationStore";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, mutate: login } = useLogin(() => navigate("/"));
  const clearActivationData = useActivationStore((s) => s.clearActivationData);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearActivationData();
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            LOGIN
          </CardHeader>
          <CardBody>
            <VStack align={"start"} spacing={"10px"}>
              <Text>Username</Text>
              <Input onChange={(e) => setUsername(e.target.value)}></Input>
              <Text>Password</Text>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <HStack justify={"center"} w={"100%"} marginTop={"20px"}>
                <VStack spacing={"20px"}>
                  <Button type="submit" w={"95px"}>
                    Login
                  </Button>
                  <VStack spacing={"2px"}>
                    <Text>Haven't signed up yet?</Text>
                    <Link to={"/signup"}>
                      <Text color={"#71c6dd"}>Sign Up</Text>
                    </Link>
                  </VStack>
                  {/* <FormattedApiErrors errorMessages={error?.messages} />
                  {error && <Text>{error.message}</Text>} */}
                  <ApiErrorDisplay error={error} />
                  {isLoading && <Spinner />}
                </VStack>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </HStack>
    </form>
  );
};

export default LoginForm;
