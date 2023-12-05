import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";
import { BsCart2 } from "react-icons/bs";
import { useSelector } from "react-redux";

function AddToCartButton({
  productType,
  confirmHandler,
  ptIndex,
  setPtIndex,
  setImg,
}) {
  const initRef = React.useRef();
  const cart = useSelector((state) => state.cart);
  // console.log(cart);
  return (
    <>
      {productType.length ? (
        <Popover closeOnBlur={false} placement="auto" initialFocusRef={initRef}>
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  ref={initRef}
                  rounded={"none"}
                  w={"full"}
                  mt={8}
                  mx={2}
                  size={"lg"}
                  py={"7"}
                  bg="black"
                  color="white"
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  Add to cart
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverHeader>Chọn phân loại hàng</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Wrap px={4} py={2}>
                      {productType.map((pt, id) => {
                        return (
                          <Button
                            key={id}
                            variant={"unstyled"}
                            p={2}
                            bgColor={
                              ptIndex === id ? "secondary.200" : "secondary.100"
                            }
                            onClick={() => {
                              setPtIndex(id);
                              setImg(pt.image[0]._id);
                            }}
                          >
                            <Text>{pt.name}</Text>
                          </Button>
                        );
                      })}
                    </Wrap>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      mt={4}
                      px={2}
                      colorScheme="blue"
                      onClick={() => {
                        confirmHandler(ptIndex);
                        // saveCart(cart);
                        onClose();
                      }}
                      isDisabled={ptIndex === null}
                      ref={initRef}
                      rounded={"none"}
                      w={"full"}
                      size={"lg"}
                      py={"7"}
                      bg="black"
                      color="white"
                      textTransform={"uppercase"}
                    >
                      <Flex>
                        <Text mr={2}>Thêm</Text>
                        <BsCart2 size={"1.25rem"} />
                      </Flex>
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      ) : (
        // <Button
        //   mt={4}
        //   px={2}
        //   colorScheme="blue"
        //   onClick={() => {
        //     confirmHandler(null);
        //   }}
        //   variant={"unstyled"}
        //   bgColor={"secondaryDark.100"}
        //   ref={initRef}
        //   color={"white"}
        // >
        //   <Flex>
        //     <Text mr={2}>Thêm vào giỏ hàng</Text>
        //     <BsCart2 size={"1.25rem"} />
        //   </Flex>
        // </Button>

        <Button
          ref={initRef}
          rounded={"none"}
          w={"full"}
          mt={8}
          size={"lg"}
          py={"7"}
          bg="black"
          color="white"
          textTransform={"uppercase"}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
          onClick={() => {
            confirmHandler(null);
            // saveCart(cart);
          }}
        >
          Add to cart
        </Button>
      )}
    </>
  );
}

export default AddToCartButton;
