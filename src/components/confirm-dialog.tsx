import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";

import { ReactChild, useRef } from "react";

export default function ConfirmDialog({
  title = "אזהרה",
  children,
  onClose,
  onDelete,
  isOpen,
  isLoading,
}: {
  title?: string;
  children: ReactChild;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onDelete: () => void;
}) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{children}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            ביטול
          </Button>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            onClick={onDelete}
            mr={3}
          >
            מחק
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
