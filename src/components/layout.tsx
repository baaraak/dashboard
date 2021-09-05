import { Box, Stack, useDisclosure } from '@chakra-ui/react';

import Navbar from './header';
import Sidebar from './sidebar';

const SiteLayout = ({ children }: any) => {
  const sidebarState = useDisclosure();

  return (
    <>
      <Box h="100%" minH="100vh" bg="gray.50">
        <Navbar {...sidebarState} />
        <Box pos="relative" h="max-content" m={[2, 0, 5]} pt={6}>
          <Stack direction="row" spacing={{ md: 5 }}>
            <Sidebar {...sidebarState} />
            <Box w="full">{children}</Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SiteLayout;
