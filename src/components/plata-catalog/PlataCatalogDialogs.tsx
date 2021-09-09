import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { ReactChild, useRef } from "react";
import InputField from "../input-field";

export function DiscountDialog({ onSubmit }: { onSubmit: (v: any) => void }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleSubmit = (values: any) => {
    onSubmit(values);
    reset({ discount: "" });
    onClose();
  };

  return (
    <Dialog
      header="הוסף הנחה"
      buttonText="הוסף הנחה"
      onSubmit={handleSubmit(onHandleSubmit)}
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    >
      <InputField
        name="discount"
        error={errors.discount}
        label="הוסף הנחה (באחוזים)"
        type="number"
        control={control}
        placeholder="הכנס סכום"
        rules={{ required: "אנא הכנס ערך" }}
      />
    </Dialog>
  );
}

export function PlataDialog({ onSubmit }: { onSubmit: (v: any) => void }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleSubmit = (values: any) => {
    onSubmit(values);
    reset({ name: "", price: "" });
    onClose();
  };

  return (
    <Dialog
      header="הוסף פלטה"
      buttonText="פלטת כיבודים"
      onSubmit={handleSubmit(onHandleSubmit)}
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    >
      <>
        <InputField
          name="name"
          error={errors.name}
          label="שם המוצר"
          type="text"
          control={control}
          placeholder="הכנס שם"
          rules={{ required: "אנא הכנס ערך" }}
        />
        <InputField
          name="price"
          error={errors.price}
          label="מחיר המוצר"
          type="number"
          control={control}
          placeholder="הכנס מחיר"
          rules={{ required: "אנא הכנס ערך" }}
        />
      </>
    </Dialog>
  );
}

export function DeliveryDialog({ onSubmit }: { onSubmit: (v: any) => void }) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleSubmit = (values: any) => {
    onSubmit({ name: "משלוח", price: values.delivery });
    reset({ delivery: "" });
    onClose();
  };

  return (
    <Dialog
      onSubmit={handleSubmit(onHandleSubmit)}
      header="הוסף משלוח"
      buttonText="משלוח"
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    >
      <InputField
        name="delivery"
        error={errors.delivery}
        label="משלוח"
        type="number"
        control={control}
        placeholder="הכנס סכום"
        rules={{ required: "אנא הכנס ערך" }}
      />
    </Dialog>
  );
}

export function Dialog({
  onSubmit,
  buttonText,
  header,
  children,
  onOpen,
  onClose,
  isOpen,
}: {
  onSubmit: any;
  onOpen: any;
  onClose: any;
  isOpen: any;
  header: string;
  buttonText: string;
  children: ReactChild;
}) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className="plata" onClick={onOpen}>
        {buttonText}
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        autoFocus
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form onSubmit={onSubmit}>
              <AlertDialogHeader>{header}</AlertDialogHeader>
              <AlertDialogBody>
                <Stack spacing={6}>{children}</Stack>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={onClose} ml="2">
                  בטל
                </Button>
                <Button type="submit" colorScheme="facebook">
                  הוסף
                </Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
