import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";

export default function Loading({ isOpen = false }) {
  return (
    <Modal isOpen={isOpen} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={10}>
          <HStack>
            <Spinner />
            <Text>Loading</Text>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
