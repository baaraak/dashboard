import {
  Stack,
  Grid,
  Flex,
  IconButton,
  Text,
  Box,
  Collapse,
} from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Plata } from "types/Plata";

type Props = {
  collapsedPlata?: string;
  setCollapsedPlata: (id: string) => void;
  setConfirmPlataDelete: (id: string) => void;
};

export default function PlatotList({
  collapsedPlata,
  setCollapsedPlata,
  setConfirmPlataDelete,
  ...plata
}: Props & Plata) {
  const onClickProps = {
    transition: "all .2s ease-in",
    cursor: "pointer",

    onClick: () =>
      collapsedPlata === plata._id
        ? setCollapsedPlata("")
        : setCollapsedPlata(plata._id),
    _hover: {
      borderColor: "blue.600",
    },
  };
  return (
    <>
      <Grid
        key={plata._id}
        gridTemplateColumns="1fr"
        overflowX="auto"
        pb={{ base: 6, md: 2 }}
        fontSize="small"
      >
        <Grid
          gridTemplateColumns="1fr 1fr 1fr"
          px={{ base: 4, md: 12 }}
          mb={2}
          fontSize="xs"
          fontWeight="semibold"
          color="gray.700"
        >
          <Box>שם הפלטה</Box>
          <Box textAlign="left">מחיקה</Box>
        </Grid>

        <Grid
          gridTemplateColumns="1fr 1fr 1fr"
          border="1px"
          borderColor="gray.100"
          minH={12}
          alignItems="center"
          px={{ base: 4, md: 12 }}
          shadow="md"
          bg="white"
          rounded="xl"
          color="gray.600"
          pos="relative"
          {...(plata.child.length > 0 ? onClickProps : {})}
        >
          {plata.child.length > 0 && (
            <IconButton
              pos="absolute"
              left={3}
              isRound
              variant="outline"
              aria-label="arrow"
              colorScheme="facebook"
              size="xs"
              icon={
                collapsedPlata === plata._id ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )
              }
            />
          )}

          <Box>{plata.name}</Box>
          <Flex justify="end">
            <Text
              borderBottom="1px"
              borderColor="transparent"
              color="red"
              transition="border .2s ease-in"
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation(); // prevent collapse from opening
                setConfirmPlataDelete(plata._id);
              }}
              _hover={{
                borderColor: "red",
              }}
            >
              מחיקה
            </Text>
          </Flex>
        </Grid>
      </Grid>
      {plata.child.length > 0 && (
        <Collapse in={collapsedPlata === plata._id} startingHeight={0}>
          <Stack spacing={4} p={6}>
            {plata.child.map((p) => (
              <Flex
                key={p._id}
                border="1px"
                borderColor="gray.100"
                minH={10}
                alignItems="center"
                justifyContent="space-between"
                px={{ base: 4, md: 12 }}
                bg="white"
                fontSize="small"
                rounded="xl"
                color="gray.600"
              >
                <Box>{p.name}</Box>
                <Flex justify="end">
                  <Text
                    borderBottom="1px"
                    borderColor="transparent"
                    color="red"
                    transition="border .2s ease-in"
                    cursor="pointer"
                    onClick={(e) => {
                      setConfirmPlataDelete(p._id);
                    }}
                    _hover={{
                      borderColor: "red",
                    }}
                  >
                    מחיקה
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Collapse>
      )}
    </>
  );
}
