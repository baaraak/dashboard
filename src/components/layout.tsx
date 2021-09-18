import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header";
import Sidebar from "../modules/sidebar/sidebar";
import { useAuth } from "context/auth";

const Layout = ({ children }: any) => {
  const sidebarState = useDisclosure();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // runs only on location, i.e. route, change
    sidebarState.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <Box h="100%" minH="100vh" bg="gray.50">
        <Header {...sidebarState} username={user?.username} logout={logout} />
        <Box pos="relative" h="max-content" m={[2, 0, 5]} pt={6}>
          <Stack direction="row" spacing={{ md: 5 }}>
            <Sidebar {...sidebarState} />
            <Stack
              spacing={6}
              w="100%"
              maxW="6xl"
              mx="auto !important"
              px={{ base: 4, md: 6 }}
            >
              {children}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
