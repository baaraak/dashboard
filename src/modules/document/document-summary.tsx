import {
  Center,
  Heading,
  Button,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  List,
  ListItem,
  ListIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DocumentItem, Details } from "context/document";
import {
  BsBookHalf,
  BsBuilding,
  BsCalendar,
  BsCardText,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { FiAtSign } from "react-icons/fi";

const DocumentSummary = ({
  isLoading,
  catalog,
  details,
  onSubmit,
}: {
  isLoading: boolean;
  catalog: DocumentItem[];
  details: Details | null;
  onSubmit: () => void;
}) => {
  const tableSize = useBreakpointValue({ base: "sm", md: "lg" });
  return (
    <Center
      flexDir="column"
      bg="white"
      shadow="md"
      borderWidth={1}
      px={[4, 12]}
      py={[8, 6, 12]}
      my={[4, 0]}
      rounded="xl"
    >
      <Heading>סיכום מסמך</Heading>
      <List spacing={3} alignSelf={{ base: "center", md: "flex-start" }} p={4}>
        {details?.name && (
          <ListItem>
            <ListIcon as={BsBuilding} />
            {details.name}
          </ListItem>
        )}
        {details?.contactPerson && (
          <ListItem>
            <ListIcon as={BsFillPersonLinesFill} />
            {details.contactPerson}
          </ListItem>
        )}
        {details?.email && (
          <ListItem>
            <ListIcon as={FiAtSign} />
            {details.email}
          </ListItem>
        )}
        {details?.taxId && (
          <ListItem>
            <ListIcon as={BsBookHalf} />
            {details.taxId}
          </ListItem>
        )}
        {details?.dueDate && (
          <ListItem>
            <ListIcon as={BsCalendar} />
            {details.dueDate.toLocaleDateString("he")}
          </ListItem>
        )}
        {details?.data && (
          <ListItem>
            <ListIcon as={BsCardText} />
            {details.data}
          </ListItem>
        )}
      </List>
      <Table size={tableSize}>
        <Thead>
          <Tr>
            <Th>שם</Th>
            <Th>מחיר</Th>
            <Th>כמות</Th>
            <Th>סה"כ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {catalog.map((o: any) => {
            return (
              <Tr key={o.name}>
                <Td>{o.name}</Td>
                <Td>&#8362;{o.price}</Td>
                <Td>{o.quantity}</Td>
                <Td>&#8362;{o.price * o.quantity}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        type="submit"
        colorScheme="facebook"
        mt={8}
        w="100%"
        isLoading={isLoading}
        onClick={onSubmit}
      >
        אשר
      </Button>
    </Center>
  );
};

export default DocumentSummary;
