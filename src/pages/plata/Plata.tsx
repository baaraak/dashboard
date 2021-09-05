import { useMemo, useState, useRef } from 'react';
import { Stack, useToast, Skeleton, Heading, Center } from '@chakra-ui/react';
import { usePlatot } from '../../hooks/usePlatot';
import { Plata as PlataType } from '../../types/Plata';
import { useAddPlata } from '../../hooks/useAddPlata';
import { useDeletePlata } from '../../hooks/useDeletePlata';
import DeletePlataDialog from './DeletePlataDialog';
import PlataList from './PlataList';
import AddPlataForm from './AddPlataForm';

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
        <AddPlataForm
          onSubmit={onSubmit}
          platotList={sortedPlatotParentsFirst}
          isLoading={isAddMutationLoading}
        />
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
            <PlataList
              onDelete={setSelectedPlata}
              list={sortedPlatotParentsFirst}
            />
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
