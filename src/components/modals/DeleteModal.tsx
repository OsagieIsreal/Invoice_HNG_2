import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invoiceId: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, invoiceId }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { colorMode } = useColorMode();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      motionPreset="scale"
    >
      <AlertDialogOverlay bg="blackAlpha.600">
        <AlertDialogContent
          bg={colorMode === "dark" ? "#1E2139" : "white"}
          borderRadius="8px"
          p={4}
          maxW="480px"
        >
          <AlertDialogHeader fontSize="2xl" fontWeight={700}>
            Confirm Deletion
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text color="#888EB0" fontSize="sm" lineHeight="1.7">
              Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter gap={2}>
            <Button ref={cancelRef} variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
