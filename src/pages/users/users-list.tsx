import {
  Grid,
  Flex,
  IconButton,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Box,
  SimpleGrid,
  Collapse,
} from "@chakra-ui/react";
import SpinnerContainer from "components/spinner-container";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Permissions } from "services/permissions";
import { User } from "types/User";

type Props = {
  collapsedUser?: string;
  isPermissionsLoading: boolean;
  setCollapsedUser: (id: string) => void;
  setConfirmUserDelete: (id: string) => void;
  onPermissions: (userId: string, permissionId: string) => void;
};

export default function UsersList({
  collapsedUser,
  setCollapsedUser,
  setConfirmUserDelete,
  onPermissions,
  isPermissionsLoading,
  ...user
}: Props & User) {
  return (
    <Grid
      key={user._id}
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
        <Box>שם משתמש</Box>
        <Box>תאריך יצירה</Box>
        <Box>פעולות</Box>
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
        transition="all .2s ease-in"
        cursor="pointer"
        onClick={() =>
          collapsedUser === user._id
            ? setCollapsedUser("")
            : setCollapsedUser(user._id)
        }
        _hover={{
          borderColor: "blue.600",
        }}
        pos="relative"
      >
        <IconButton
          pos="absolute"
          left={3}
          isRound
          variant="outline"
          aria-label="arrow"
          colorScheme="facebook"
          size="xs"
          icon={
            collapsedUser === user._id ? <IoIosArrowUp /> : <IoIosArrowDown />
          }
        />

        <Box>{user.username}</Box>
        <Box>{new Date(user.createdAt).toLocaleDateString("he")}</Box>
        <Flex fontSize="small">
          <Text
            borderBottom="1px"
            borderColor="transparent"
            color="red"
            transition="border .2s ease-in"
            onClick={(e) => {
              e.stopPropagation(); // prevent collapse from opening
              setConfirmUserDelete(user._id);
            }}
            _hover={{
              borderColor: "red",
            }}
          >
            מחיקה
          </Text>
        </Flex>
      </Grid>
      <Collapse in={collapsedUser === user._id} startingHeight={0}>
        <SpinnerContainer isLoading={isPermissionsLoading}>
          <SimpleGrid spacing={4} columns={[2, 3, 4]} p={{ base: 2, md: 5 }}>
            {Permissions.map((p) => (
              <FormControl display="flex" alignItems="center" key={p.id}>
                <Switch
                  id={p.id}
                  ml={4}
                  isChecked={user.permissions.includes(p.id)}
                  onChange={() => onPermissions(user._id, p.id)}
                />
                <FormLabel
                  htmlFor={p.id}
                  mb="0"
                  color="gray.500"
                  cursor="pointer"
                  transition="color .1s ease"
                  _hover={{ color: "gray.700" }}
                >
                  {p.name}
                </FormLabel>
              </FormControl>
            ))}
          </SimpleGrid>
        </SpinnerContainer>
      </Collapse>
    </Grid>
  );
}
