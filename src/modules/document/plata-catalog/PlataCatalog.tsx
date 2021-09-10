import {
  Box,
  Flex,
  Grid,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { usePlatot } from "hooks/usePlatot";
import { DocumentItem } from "../../../context/document";
import { Plata } from "types/Plata";
import { getCatalogLength, getCatalogPriceSum } from "./PlataCatalog.services";
import {
  DiscountDialog,
  DeliveryDialog,
  PlataDialog,
} from "./PlataCatalogDialogs";
import PlataItem from "./PlataItem";
import { CatalogDetailsTable } from "./CatalogDetailsTable";

export default function PlataCatalog({
  catalog,
  onChange,
}: {
  catalog: DocumentItem[];
  onChange: (item: DocumentItem[]) => void;
}) {
  const { data: platot, isLoading } = usePlatot();

  const onClickPlata = (plata: Plata) => {
    const isPlataExist = catalog.find((o) => o.name === plata.name);
    const newItem = {
      name: plata.name,
      price: plata.price,
      quantity: isPlataExist ? isPlataExist.quantity + 1 : 1,
    };
    onChange(
      isPlataExist
        ? catalog.map((c) => (c.name === isPlataExist.name ? newItem : c))
        : [...catalog, newItem],
    );
  };

  const changeQuantity = (value: string, name: string) => {
    onChange(
      catalog.map((o) =>
        o.name === name ? Object.assign({}, o, { quantity: Number(value) }) : o,
      ),
    );
  };

  const onRemovePlata = (name: string) => {
    onChange(catalog.filter((o) => o.name !== name));
  };

  const addDiscount = (discount: number) => {
    const isDiscountExist = catalog.find((o) => o.name === "הנחה");
    if (isDiscountExist) {
      return onChange(
        catalog.map((o) => (o.name === "הנחה" ? { ...o, discount } : o)),
      );
    }
    onChange(catalog.concat({ name: "הנחה", discount, quantity: 1 }));
  };

  const handleDialogSubmit = (values: any) => {
    if (values.discount) {
      addDiscount(Number(values.discount));
      return;
    }
    onClickPlata(values);
  };

  if (isLoading) return <Spinner />;

  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 30%"]}
      bg="white"
      shadow="xl"
      rounded="lg"
      overflow="hidden"
    >
      <Grid
        templateColumns="repeat(auto-fit, minmax(110px, 1fr))"
        gridGap="1px"
        pos="relative"
      >
        {platot.map((plata: Plata) =>
          plata.child.length > 0 ? (
            <PlataWithChildren
              key={plata.name}
              plata={plata}
              onClickPlata={onClickPlata}
            />
          ) : (
            <PlataItem onClick={() => onClickPlata(plata)} key={plata.name}>
              {plata.name}
            </PlataItem>
          ),
        )}

        <DiscountDialog onSubmit={handleDialogSubmit} />
        <DeliveryDialog onSubmit={handleDialogSubmit} />
        <PlataDialog onSubmit={handleDialogSubmit} />

        <PlataItem onClick={() => addDiscount(10)}>הנחה 10%</PlataItem>
      </Grid>
      <Flex flexDir="column">
        <Box h="500px" overflowY="auto">
          <CatalogDetailsTable
            catalog={catalog}
            onRemovePlata={onRemovePlata}
            changeQuantity={changeQuantity}
          />
        </Box>
        <Box mt="auto" borderTop="1px" borderColor="gray.200">
          <Flex
            p={2}
            justifyContent="space-between"
            fontWeight="semibold"
            borderBottom="1px"
            borderColor="gray.200"
          >
            פריטים:
            <span>{getCatalogLength(catalog)}</span>
          </Flex>
          <Flex p={2} justifyContent="space-between" fontWeight="semibold">
            סה"כ:
            <span>&#8362;{getCatalogPriceSum(catalog)}</span>
          </Flex>
        </Box>
      </Flex>
    </Grid>
  );
}

function PlataWithChildren({ onClickPlata, plata }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return isOpen ? (
    <Box pos="absolute" bg="white" w="100%" h="100%">
      <Grid
        templateColumns="repeat(auto-fit, minmax(110px, 1fr))"
        gridGap="1px"
      >
        {plata.child.map((plata: Plata) => {
          return (
            <PlataItem key={plata.name} onClick={() => onClickPlata(plata)}>
              {plata.name}
            </PlataItem>
          );
        })}
      </Grid>
      <Box pos="absolute" left={2} bottom={2} onClick={onClose}>
        <Button size="lg">חזור</Button>
      </Box>
    </Box>
  ) : (
    <PlataItem onClick={onOpen} key={plata.name}>
      {plata.name}
    </PlataItem>
  );
}
