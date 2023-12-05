import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsTrash } from "react-icons/bs";

function DangerConfirmDialog({
  isOpen = null,
  onClose = () => {},
  confirmHandler = () => {},
  actionType = "xóa",
  recordType = "sản phẩm",
}) {
  return (
    <>
      <AlertDialog isOpen={isOpen !== null} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác nhận {actionType} {recordType} {isOpen?.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Sản phẩm đã xóa không thể được khôi phục lại!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Hủy</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  confirmHandler(isOpen);
                }}
                ml={3}
              >
                <BsTrash />
                <Text ml={2}>{actionType.toUpperCase()}</Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DangerConfirmDialog;
