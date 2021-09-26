import {
  Stack,
  IconButton,
  Button,
  Flex,
  Heading,
  Center,
  FormControl,
  Grid,
  Box,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { components } from "react-select";
import productsData from "./data.json";
import { useState } from "react";

import { FaApple } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export default function Plata() {
  const [products, setProducts] = useState([]);

  const onAddProduct = ({ label, price }: { label: string; price: string }) => {
    const isProductExist = products.find((p: any) => p.label === label);
    if (isProductExist) {
      setProducts((p: any) =>
        p.map((d: any) =>
          d.label === label ? { ...d, quantity: d.quantity + 1 } : d,
        ),
      );
    } else {
      setProducts((p: any) => p.concat({ label, price, quantity: 1 }));
    }
  };
  return (
    <>
      <Heading size="lg" fontWeight="regular">
        החלפת סחורה
      </Heading>
      <Center>
        <Stack spacing={4} w="100%">
          <Stack direction={["column", "row"]} spacing={[4, 16]}>
            <FormControl>
              <FormLabel htmlFor="given">סניף נותן</FormLabel>
              <Select
                id="given"
                name="given"
                placeholder="בחר סניף נותן"
                options={Branches}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="receiving">סניף מקבל</FormLabel>
              <Select
                id="receiving"
                name="receiving"
                options={Branches}
                placeholder="בחר סניף מקבל"
              />
            </FormControl>
          </Stack>
          <Stack direction={["row"]}>
            <FormControl>
              <FormLabel htmlFor="receiving">מוצרים</FormLabel>
              <Select
                id="receiving"
                name="receiving"
                value=""
                onChange={onAddProduct}
                closeMenuOnSelect={false}
                styles={{
                  option: (base: any) => ({
                    ...base,
                  }),
                }}
                options={productsData}
                components={{ Option: CustomOption }}
                placeholder="בחר מוצרים"
              />
            </FormControl>
            <IconButton
              aria-label="הוסף מוצר"
              icon={<FiPlus />}
              alignSelf="end"
            />
          </Stack>
          {products.map((p: any) => (
            <Grid
              key={p.label}
              gridTemplateColumns="1fr"
              overflowX="auto"
              pb={{ base: 4, md: 2 }}
              fontSize="small"
            >
              <Grid
                gridTemplateColumns="1fr 1fr 1fr 1fr"
                px={{ base: 4, md: 12 }}
                mb={2}
                fontSize="xs"
                fontWeight="semibold"
                color="gray.700"
              >
                <Box>שם המוצר</Box>
                <Box>מחיר</Box>
                <Box>כמות</Box>
                <Box>מחק</Box>
              </Grid>

              <Grid
                gridTemplateColumns="1fr 1fr 1fr 1fr"
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
              >
                <Box>{p.label}</Box>
                <Box>{p.price}</Box>
                <Box>{p.quantity}</Box>
                <Flex fontSize="small">
                  <Text
                    borderBottom="1px"
                    borderColor="transparent"
                    color="red"
                    transition="border .2s ease-in"
                    onClick={() =>
                      setProducts((d) =>
                        d.filter((x: any) => x.label !== p.label),
                      )
                    }
                    _hover={{
                      borderColor: "red",
                    }}
                  >
                    מחיקה
                  </Text>
                </Flex>
              </Grid>
            </Grid>
          ))}
          <Button colorScheme="facebook">אישור</Button>
        </Stack>
      </Center>
    </>
  );
}

const CustomOption = (props: any) => {
  return (
    <Flex borderBottom="1px" borderColor="gray.200" fontSize={["sm", "medium"]}>
      <components.Option {...props}>
        <Flex justifyContent="space-between">
          <div>{props.children}</div>
          <div>מחיר: {props.data.price}₪</div>
        </Flex>
      </components.Option>
    </Flex>
  );
};

const Branches = [
  {
    label: "אפק",
    value: "אפק",
  },
  {
    label: "שפיר",
    value: "שפיר",
  },
];
