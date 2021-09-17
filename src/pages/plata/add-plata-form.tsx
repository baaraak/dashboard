import {
  Stack,
  FormLabel,
  FormControl,
  Button,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

import { useEffect, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import InputField from "components/input-field";
import Select from "components/multi-select";
import FeedbackMessage from "components/feedback-message";
import { useAddPlata } from "hooks/useAddPlata";
import { Plata } from "types/Plata";

export type NewPlataType = {
  name: string;
  price: number;
  parent?: any;
};

export default function AddPlata({ platot }: { platot: Plata[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync, isLoading, data, reset: resetMutation } = useAddPlata();
  const toast = useToast();

  const onSubmit = async (v: NewPlataType) => {
    try {
      const { parent } = v;
      await mutateAsync({ ...v, parent: parent ? parent.value : undefined });
    } catch (e) {
      toast({ status: "error", description: "אופס, משהו השתבש" });
    }
  };

  useEffect(() => {
    // reset values when dialog closed || new user created
    if (!isOpen || (isOpen && data?.success)) {
      onClose();
      resetMutation();
    }
  }, [data?.success, isOpen, onClose, resetMutation]);

  useEffect(() => {
    if (data?.success) {
      toast({ status: "success", description: "פלטה נוצרה בהצלחה" });
    }
  }, [data?.success, toast]);

  return (
    <>
      <Center
        border="2px"
        borderColor="gray.300"
        minH={12}
        fontWeight="semibold"
        alignItems="center"
        shadow="md"
        bg="white"
        mb={{ base: 6, md: 2 }}
        rounded="xl"
        color="gray.600"
        transition="all .2s ease-in"
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          borderColor: "blue.600",
          color: "blue.600",
        }}
      >
        <AiOutlineUserAdd style={{ marginLeft: "10px" }} /> צור פלטה חדשה
      </Center>
      <PlataForm
        onSubmit={onSubmit}
        isOpen={isOpen}
        error={data?.error}
        isLoading={isLoading}
        onClose={onClose}
        platotList={platot.map(({ _id: value, name: label }) => ({
          value,
          label,
        }))}
      />
    </>
  );
}

function PlataForm({
  onSubmit,
  isOpen,
  error,
  isLoading,
  onClose,
  platotList,
}: {
  onSubmit: (v: any) => void;
  isOpen: boolean;
  error?: string;
  isLoading: boolean;
  onClose: () => void;
  platotList: { value: string; label: string }[];
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <AlertDialogHeader>צור משתמש</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Stack spacing={2}>
            {error && (
              <FeedbackMessage
                status="error"
                title="שגיאה"
                description={error}
              />
            )}
            <InputField
              error={errors.name}
              label="שם הפלטה"
              placeholder="כריכוני בריוש"
              control={control}
              name="name"
              rules={{
                required: "הכנס שם",
              }}
            />
            <InputField
              error={errors.price}
              label="מחיר"
              placeholder="מחיר המוצר"
              control={control}
              type="number"
              name="price"
              rules={{
                required: "הכנס מחיר",
              }}
            />
            <FormControl>
              <FormLabel htmlFor="parent">הכנס תחת</FormLabel>
              <Controller
                name="parent"
                control={control}
                render={({ field }) => (
                  <Select
                    options={platotList}
                    placeholder="בחר פלטה"
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Stack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            ביטול
          </Button>
          <Button
            type="submit"
            colorScheme="facebook"
            isLoading={isLoading}
            mr={3}
          >
            צור פלטה
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
