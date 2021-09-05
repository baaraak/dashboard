import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';

const DeletePlataDialog = ({
  onClose,
  onDelete,
  isOpen,
  cancelRef,
  isLoading,
}: {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onDelete: () => void;
  cancelRef: MutableRefObject<null>;
}) => (
  <AlertDialog
    motionPreset="slideInBottom"
    leastDestructiveRef={cancelRef}
    onClose={onClose}
    isOpen={isOpen}
    isCentered
  >
    <AlertDialogOverlay />
    <AlertDialogContent>
      <AlertDialogHeader>אזהרה</AlertDialogHeader>
      <AlertDialogCloseButton />
      <AlertDialogBody>למחוק את הפלטה?</AlertDialogBody>
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

export default DeletePlataDialog;
