import { HStack, Image, Show, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const NavBar = () => {
  return (
    <HStack spacing={"60px"} p={'30px'}>
      <Link to={""}>
        <HStack>
          <Image src={logo} boxSize="35px" />
          <Text fontSize="xl" fontWeight="bold">
            CodeHub
          </Text>{" "}
        </HStack>
      </Link>
      <SearchInput />
      <Show above="lg">
        <UserProfile />
      </Show>
    </HStack>
  );
};

export default NavBar;
