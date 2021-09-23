import { useMemo, useState } from "react";
import { Stack, useToast, Heading, Center } from "@chakra-ui/react";

import Skeletons from "components/skeletons";
import ConfirmDialog from "components/confirm-dialog";

import { usePlatot } from "hooks/plata/usePlatot";
import PlatotList from "./platot-list";
import { Plata as PlataType } from "types/Plata";
import AddPlataForm from "./add-plata-form";
import { useDeletePlata } from "hooks/plata/useDeletePlata";

export type AddPlataValues = {
  name: string;
  price: string;
  parent?: string;
};

export default function Plata() {
  const { data, isLoading } = usePlatot();
  const [collapsedPlata, setCollapsedPlata] = useState<string>();
  const [confirmPlataDelete, setConfirmPlataDelete] = useState<string>();
  const { mutateAsync: deleteMutation, isLoading: isDeleteMutationLoading } =
    useDeletePlata();
  const toast = useToast();

  const onDelete = async () => {
    if (!confirmPlataDelete) return;
    try {
      await deleteMutation(confirmPlataDelete);
      toast({ status: "success", description: "פלטה נמחקה בהצלחה" });
    } catch (e) {
      toast({ status: "error", description: "אופס, משהו השתבש" });
    }
    setConfirmPlataDelete("");
  };

  const platotList = useMemo(() => {
    return (data as PlataType[])?.sort(
      (a, b) => b.child.length - a.child.length,
    );
  }, [data]);

  return (
    <>
      <Heading size="lg" fontWeight="regular">
        ניהול פלטות
      </Heading>
      <Center>
        <Stack spacing={4} w="100%">
          {isLoading ? (
            <>
              <Skeletons length={4} height={16} />
            </>
          ) : (
            <>
              <AddPlataForm platot={data} />
              {platotList.map((plata: PlataType) => (
                <PlatotList
                  {...plata}
                  key={plata._id}
                  collapsedPlata={collapsedPlata}
                  setCollapsedPlata={setCollapsedPlata}
                  setConfirmPlataDelete={setConfirmPlataDelete}
                />
              ))}
            </>
          )}
        </Stack>
      </Center>
      <ConfirmDialog
        children="למחוק את הפלטה?"
        onClose={() => setConfirmPlataDelete("")}
        onDelete={onDelete}
        isOpen={!!confirmPlataDelete}
        isLoading={isDeleteMutationLoading}
      />
    </>
  );
}
