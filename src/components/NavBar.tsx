import { Box, Container, HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const NavBar = () => {
  return (
    <Box w="100%" bgColor="gray.700">
      <Container maxW="1200px" px={4}>
        <HStack spacing="60px" py="30px">
          <Link to="/">
            <HStack>
              <Image src={logo} boxSize="35px" />
              <Text fontSize="xl" fontWeight="bold">
                CodeHub
              </Text>
            </HStack>
          </Link>

          <SearchInput />

          <Show above="lg">
            <UserProfile />
          </Show>
        </HStack>
      </Container>
    </Box>
  );
};

export default NavBar;
