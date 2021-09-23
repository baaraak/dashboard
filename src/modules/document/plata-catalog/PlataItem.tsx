import { Flex } from "@chakra-ui/react";

const PlataItem = (props: any) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      border="1px"
      borderColor="gray.200"
      shadow="base"
      fontWeight="semibold"
      color="gray.700"
      cursor="pointer"
      padding={2}
      minH="120px"
      minW="120px"
      {...props}
      sx={{ aspectRatio: "1/1" }}
      transition="all .2s ease-in"
      _hover={{
        bg: "gray.50",
        shadow: "xl",
      }}
    />
  );
};

export default PlataItem;
