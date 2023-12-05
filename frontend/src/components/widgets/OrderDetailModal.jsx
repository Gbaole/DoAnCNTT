import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../API/Order";
import DynamicTable from "./DynamicTable";

function OrderDetailModal({ onClose, isOpen, mdh }) {
  const [order, setOrder] = useState({
    contactInfo: {
      name: "",
      email: "",
      phone: "",
      address: {
        homeSt: "",
        ward: "",
        district: "",
        province: "",
      },
    },
    cart: {
      products: [
        {
          id: "",
          name: "",
          price: 0,
          quantity: 0,
        },
      ],
      count: 0,
      totalPrice: 0,
    },
    _id: "",
    mdh: "",
    createdAt: "",
  });
  useEffect(() => {
    if (mdh) {
      getOrderDetail(mdh).then((res) => {
        setOrder(res.data.order);
      });
    }
  }, [mdh]);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      scrollBehavior={"inside"}
      size={"2xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mdh}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex w={"100%"} flexDirection={"column"}>
            <Text>
              Tạo lúc: {new Date(order?.createdAt).toLocaleString("vi-vn")}
            </Text>
            <Text>
              <b>Tên người đặt:</b> {order.contactInfo.name}
            </Text>
            <Text>
              <b>Email:</b> {order.contactInfo.email}
            </Text>
            <Text>
              <b>Số điện thoại:</b> {order.contactInfo.phone}
            </Text>
            <Text>
              <b>Địa chỉ:</b> {order.contactInfo.address.homeSt},{" "}
              {order.contactInfo.address.ward},{" "}
              {order.contactInfo.address.district},{" "}
              {order.contactInfo.address.province}
            </Text>
            {DynamicTable({
              array: order.cart.products,
              definition: [
                {
                  dis: "Tên sản phẩm",
                  key: "name",
                  type: "string",
                },
                {
                  dis: "Giá",
                  key: "price",
                  type: "string",
                },
                {
                  dis: "Số lượng",
                  key: "quantity",
                  type: "string",
                },
              ],
            })}
          </Flex>
          <Flex></Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OrderDetailModal;
