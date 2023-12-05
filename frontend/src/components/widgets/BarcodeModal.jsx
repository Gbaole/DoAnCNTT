import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getProductBarcode } from "../../API/Product";
import Barcode from "react-barcode";

function BarcodeModal({ showBC, setShowBC }) {
  const [bc, setBC] = useState([]);
  useEffect(() => {
    if (showBC) {
      getProductBarcode(showBC).then((res) => {
        // console.log(res.data);
        setBC(res.data);
      });
    }
  }, [showBC]);
  return (
    <Modal
      isOpen={showBC !== null}
      onClose={() => {
        setShowBC(null);
      }}
      size={"md"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading>Barcode</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          {bc.map((item, id) => {
            if (item.barcode) {
              return (
                <Flex key={id} justify={"center"}>
                  <Barcode value={item.barcode} />
                </Flex>
              );
            }
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default BarcodeModal;
