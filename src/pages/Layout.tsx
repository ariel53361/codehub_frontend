import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <Box minH="100vh">
        <NavBar />
        <Container maxW="1200px" px={{ base: 4, lg: 6 }} py={6}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
