import {
  Box,
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "../../Utils/toolkits";
import { BsTrash } from "react-icons/bs";
import {
  addQuantity,
  addToCart,
  removeFromCart,
  subtractQuantity,
} from "../../Redux/Ducks/cart";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getProductFromBarcode } from "../../API/Product";
import { showToast } from "../../Redux/Ducks/notyfyDux";

function CartDrawer({ isOpen, onClose, token }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = useRef();
  const barcode = useRef();

  const handleCheckoutClick = async () => {
    navigate("/cart");
    onClose();
  };

  const handleScan = (code) => {
    getProductFromBarcode(code)
      .then((res) => {
        dispatch(
          addToCart({ ...res.data, qu: parseInt(quantity.current.value) })
        );
        barcode.current.value = "";
        quantity.current.value = 1;
      })
      .catch((e) => {
        barcode.current.value = "";
        quantity.current.value = 1;
        dispatch(
          showToast({
            title: "Không tìm thấy sản phẩm!",
            status: "error",
            duration: 1000,
            isClosable: true,
          })
        );
      });
  };
  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Giỏ hàng</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          {token && (
            <Flex w={"100%"} align={"center"}>
              <Input
                placeholder="Click để quét mã vạch"
                onKeyDown={({ code }) => {
                  if (code == "Enter") {
                    handleScan(barcode.current.value);
                  }
                }}
                ref={barcode}
              />
              <Text mx={2}>x</Text>
              <Input
                placeholder="Số lượng"
                w={"auto"}
                ref={quantity}
                defaultValue={"1"}
              />
            </Flex>
          )}
          <Flex w={"100%"} flexDirection={"column"}>
            {cart.products.map((item, id) => {
              return (
                <Card w={"100%"} key={id} my={2}>
                  <CardBody>
                    <HStack>
                      <Box w={"90%"}>
                        <Flex w={"100%"} justify={"space-between"}>
                          <Heading size={"md"}>{item.name}</Heading>
                          <Text fontSize={"lg"}>
                            {convertCurrency(item.price)}
                          </Text>
                        </Flex>
                        <Flex w={"100%"} justify={"space-between"}>
                          <Text fontSize={"lg"}>Số lượng</Text>
                          <Flex align={"center"} justify={"flex-end"}>
                            <IconButton
                              bgColor="transparent"
                              variant="ghost"
                              onClick={() => {
                                dispatch(
                                  subtractQuantity({
                                    pos: id,
                                    price: item.price,
                                  })
                                );
                              }}
                              icon={<BsDashCircle size={"1.25rem"} />}
                            />
                            <Input
                              size={"sm"}
                              value={item.quantity}
                              onChange={(e) => {
                                console.log(e.target.value);
                              }}
                              w={"20%"}
                              borderRadius={"lg"}
                              mx={2}
                            />
                            {/* <Text fontSize={"lg"}>{item.quantity}</Text> */}
                            <IconButton
                              variant="ghost"
                              onClick={() => {
                                dispatch(
                                  addQuantity({ pos: id, price: item.price })
                                );
                              }}
                              icon={<BsPlusCircle size={"1.25rem"} />}
                            />
                          </Flex>
                        </Flex>
                      </Box>
                      <Flex mx={4}>
                        <Button
                          onClick={() => {
                            dispatch(
                              removeFromCart({
                                pos: id,
                                price: item.price,
                              })
                            );
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </Flex>
                    </HStack>
                  </CardBody>
                </Card>
              );
            })}
          </Flex>
        </DrawerBody>
        <DrawerFooter flexDirection={"column"}>
          <Flex w={"100%"} justify={"space-between"} my="0.5rem">
            <Heading size={"md"}>Tổng số lượng</Heading>
            <Text fontSize={"lg"}>{cart.count}</Text>
          </Flex>
          <Flex w={"100%"} justify={"space-between"} my="0.5rem">
            <Heading size={"md"}>Tổng giá tiền</Heading>
            <Text fontSize={"lg"}>{convertCurrency(cart.totalPrice)}</Text>
          </Flex>
          <Flex justify={"end"} w={"100%"} mb="1rem">
            <Button
              colorScheme="black"
              variant="outline"
              onClick={handleCheckoutClick}
              w="100%"
              borderRadius="0"
            >
              CHECKOUT
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
