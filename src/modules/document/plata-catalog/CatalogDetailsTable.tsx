import {
  Center,
  Table,
  Thead,
  Tooltip,
  Tr,
  Td,
  Th,
  Tbody,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import { DocumentItem } from "context/document";

export function CatalogDetailsTable({
  catalog,
  onRemovePlata,
  changeQuantity,
}: {
  catalog: DocumentItem[];
  onRemovePlata: (n: string) => void;
  changeQuantity: (v: string, n: string) => void;
}) {
  if (catalog.length === 0) {
    return (
      <Center fontWeight="bold" mt={2} fontSize="xl">
        אין מוצרים
      </Center>
    );
  }
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>שם</Th>
          <Th>כמות</Th>
          <Th isNumeric>מחיר</Th>
          <Th isNumeric>סה"כ</Th>
          <Th isNumeric>הסר</Th>
        </Tr>
      </Thead>
      <Tbody>
        {catalog.map((o: any) => {
          return (
            <Tr key={o.name}>
              <Td>
                <Tooltip label={o.name}>{o.name}</Tooltip>
              </Td>
              <Td fontSize="xs">&#8362;{o.price}</Td>

              <Td fontSize="xs" p={0}>
                {o.name !== "הנחה" ? (
                  <NumberInput
                    value={o.quantity}
                    onChange={(v: string) => changeQuantity(v, o.name)}
                    min={1}
                    size="xs"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ) : (
                  `${o.discount}%`
                )}
              </Td>

              <Td fontSize="xs">&#8362;{o.price && o.price * o.quantity}</Td>
              <Td
                fontSize="md"
                onClick={() => onRemovePlata(o.name)}
                color="red.300"
              >
                <BiTrash className="removeCircleIcon" />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
