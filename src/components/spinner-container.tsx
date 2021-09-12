import { ReactElement } from "react";
import { Center, Box, Spinner } from "@chakra-ui/react";

export default function SpinnerContainer({
  children,
  isLoading,
}: {
  children: ReactElement;
  isLoading: boolean;
}) {
  if (!isLoading) return children;
  return (
    <Box pos="relative">
      <Center
        pos="absolute"
        w="100%"
        h="100%"
        zIndex="20"
        sx={{ backdropFilter: "blur(3px)" }}
      >
        <Spinner />
      </Center>
      {children}
    </Box>
  );
}
