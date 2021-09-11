import {
  Grid,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Plata as PlataType } from "types/Plata";
import { BiTrash } from "react-icons/bi";
import { DeletePlataValues } from "./Plata";

const PlataList = ({
  list,
  onDelete,
}: {
  list: PlataType[];
  onDelete: (data: DeletePlataValues) => void;
}) => {
  return (
    <>
      {list.map((plata: PlataType) => (
        <Grid
          key={plata._id}
          shadow="sm"
          rounded="lg"
          px={[3, 8]}
          py={2}
          minH={16}
          templateColumns="1fr auto auto"
          gridGap="4"
          borderWidth="1px"
          alignItems="center"
        >
          {plata.child.length ? (
            <Accordion allowToggle>
              <AccordionItem border="0">
                <AccordionButton
                  flexDirection="row-reverse"
                  justifyContent="flex-end"
                  fontWeight="semibold"
                >
                  {plata.name}
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel py={4}>
                  {plata.child.map((p: PlataType) => (
                    <Grid
                      key={p._id}
                      shadow="sm"
                      rounded="lg"
                      px={[1, 4]}
                      mb="2"
                      py={1}
                      templateColumns="1fr auto auto"
                      gridGap="4"
                      borderWidth="1px"
                      alignItems="center"
                    >
                      <Box pr="1" fontSize="sm">
                        {p.name}
                      </Box>
                      <Box fontSize="sm">{p.price} ₪</Box>
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          onDelete({
                            _id: p._id,
                            parent: plata._id,
                          })
                        }
                      >
                        <BiTrash />
                      </IconButton>
                    </Grid>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ) : (
            <>
              <Box>{plata.name}</Box>
              <Box>{plata.price} ₪</Box>
              <IconButton
                aria-label="delete"
                size="md"
                onClick={() => onDelete({ _id: plata._id })}
              >
                <BiTrash />
              </IconButton>
            </>
          )}
        </Grid>
      ))}
    </>
  );
};

export default PlataList;
