import {
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

import { useEffect, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import InputField from "components/input-field";
import Select from "components/multi-select";
import { Permissions } from "services/permissions";
import { useAddUser } from "hooks/useAddUser";
import FeedbackMessage from "components/feedback-message";

export type NewUserType = {
  username: string;
  password: string;
  permissions: string[];
};

export default function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isLoading, data, reset: resetMutation } = useAddUser();
  const toast = useToast();

  const onSubmit = async (v: NewUserType) => {
    try {
      await mutateAsync({
        ...v,
        permissions: v.permissions?.map((p: any) => p.value),
      });
    } catch (e) {
      toast({ status: "error", description: "אופס, משהו השתבש" });
    }
  };

  useEffect(() => {
    // reset values when dialog closed || new user created
    if (!isOpen || (isOpen && data?.success)) {
      onClose();
      resetMutation();
      reset();
    }
  }, [data?.success, isOpen, onClose, resetMutation, reset]);

  useEffect(() => {
    if (data?.success) {
      toast({ status: "success", description: "משתמש נוצר בהצלחה" });
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
        <AiOutlineUserAdd style={{ marginLeft: "10px" }} /> צור משתמש חדש
      </Center>
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
              {data?.error && (
                <FeedbackMessage
                  status="error"
                  title="שגיאה"
                  description={data.error}
                />
              )}
              <InputField
                error={errors.username}
                label="שם משתמש"
                placeholder="הכנס שם משתמש"
                control={control}
                name="username"
                rules={{
                  required: "הכנס שם משתמש",
                }}
              />
              <InputField
                error={errors.password}
                label="סיסמה"
                placeholder="בחר סיסמה"
                type="password"
                control={control}
                rules={{
                  required: "הכנס סיסמה",
                }}
                name="password"
              />
              <FormControl>
                <FormLabel htmlFor="permissions">הרשאות</FormLabel>
                <Controller
                  name="permissions"
                  control={control}
                  render={({ field }) => (
                    <Select
                      isMulti
                      options={Permissions.map(
                        ({ id: value, name: label }) => ({
                          value,
                          label,
                        }),
                      )}
                      placeholder="בחר הרשאות"
                      closeMenuOnSelect={false}
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
              צור משתמש
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
