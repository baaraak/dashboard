import {
  Grid,
  IconButton,
  Stack,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  useToast,
  Skeleton,
  Heading,
  FormLabel,
  FormControl,
  Box,
  Select,
  Center,
  Button,
} from '@chakra-ui/react';
import InputField from '../../components/input-field';
import { usePlatot } from '../../hooks/usePlatot';
import { useForm, Controller } from 'react-hook-form';
import { useMemo, useState, useRef } from 'react';
import { Plata as PlataType } from '../../types/Plata';
import { BiTrash } from 'react-icons/bi';
import { useAddPlata } from '../../hooks/useAddPlata';
import { useDeletePlata } from '../../hooks/useDeletePlata';
import DeletePlataDialog from './DeletePlataDialog';

export type AddPlataValues = {
  name: string;
  price: string;
  parent?: string;
};

export type DeletePlataValues = {
  _id: string;
  parent?: string;
} | null;

const Plata = () => {
  const { data, isLoading } = usePlatot();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState,
  } = useForm();

  const [selectedPlata, setSelectedPlata] = useState<DeletePlataValues>(null);
  const cancelRef = useRef(null);
  const { mutateAsync: addMutation, isLoading: isAddMutationLoading } =
    useAddPlata();
  const { mutateAsync: deleteMutation, isLoading: isDeleteMutationLoading } =
    useDeletePlata();
  const toast = useToast();

  const onSubmit = async (values: AddPlataValues) => {
    try {
      await addMutation(values);
      toast({ status: 'success', description: 'פלטה התווספה בהצלחה!' });
      reset({ name: '', price: '', parent: '' });
    } catch (e) {
      toast({ status: 'error', description: 'אופס, משהו השתבש' });
    }
  };

  const onDelete = async () => {
    try {
      await deleteMutation(selectedPlata);
      toast({ status: 'success', description: 'פלטה נמחקה בהצלחה' });
    } catch (e) {
      toast({ status: 'error', description: 'אופס, משהו השתבש' });
    }
    setSelectedPlata(null);
  };

  const sortedPlatotParentsFirst = useMemo(
    () =>
      data
        ? (data as PlataType[])
            .concat()
            .sort((a, b) => (a.child.length > b.child.length ? -1 : 1))
        : [],
    [data]
  );
  console.log({ formState });

  return (
    <Stack spacing={6} maxW="95%" w={{ md: '6xl' }} m="0 auto">
      <Heading size="lg" fontWeight="regular">
        הוספת פלטה
      </Heading>
      <Center
        flexDir="column"
        bg="white"
        shadow="md"
        borderWidth={1}
        px={[4, 12, 12]}
        py={[8, 6, 12]}
        rounded="xl"
      >
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%">
          <Stack spacing={6}>
            <InputField
              error={errors.name}
              label="שם הפלטה"
              placeholder="מארז לחג"
              control={control}
              rules={{
                required: 'אנא הכנס שם',
              }}
              name="name"
            />
            <InputField
              error={errors.price}
              label="מחיר"
              placeholder="0"
              type="number"
              control={control}
              rules={{
                required: 'הכנס מחיר או 0',
              }}
              name="price"
            />
            <FormControl>
              <FormLabel htmlFor="parent">הכנס תחת</FormLabel>
              <Controller
                name="parent"
                control={control}
                render={({ field }) => (
                  <Select {...field} id="parent">
                    <option value="">בחר פלטה</option>
                    {sortedPlatotParentsFirst.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Button
              colorScheme="facebook"
              type="submit"
              isLoading={isAddMutationLoading}
            >
              צור פלטה
            </Button>
          </Stack>
        </Box>
      </Center>
      <Heading size="lg" fontWeight="regular">
        רשימת פלטות
      </Heading>
      <Center
        flexDir="column"
        bg="white"
        shadow="md"
        borderWidth={1}
        px={[4, 12, 12]}
        py={[8, 6, 12]}
        rounded="xl"
      >
        <Stack spacing={6} w="100%">
          {isLoading ? (
            <Skeleton height="20px" />
          ) : (
            sortedPlatotParentsFirst.map((plata: PlataType) => (
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
                        p={0}
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
                                setSelectedPlata({
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
                      onClick={() => setSelectedPlata({ _id: plata._id })}
                    >
                      <BiTrash />
                    </IconButton>
                  </>
                )}
              </Grid>
            ))
          )}
        </Stack>
      </Center>
      <DeletePlataDialog
        onClose={() => setSelectedPlata(null)}
        onDelete={onDelete}
        isOpen={!!selectedPlata}
        cancelRef={cancelRef}
        isLoading={isDeleteMutationLoading}
      />
    </Stack>
  );
};

export default Plata;
