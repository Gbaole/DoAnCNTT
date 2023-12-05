import {
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  Wrap,
  useColorModeValue,
  Heading,
  GridItem,
  ButtonGroup,
  IconButton,
  useBreakpointValue,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../API/Customer";
import { useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "unknown",
    phone: "unknown",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("green.500");
  const pages = useSelector((state) => state.ui.pages);
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
    xl: true,
  });

  const handleSubscribe = () => {
    addCustomer(customer)
      .then((res) => {
        setMessage("Cảm ơn bạn đã đăng ký!");
        setMessageColor("green.500");
      })
      .catch((e) => {
        setMessage(e.response.data.message);
        if (e.response.data.message.includes("duplicate key")) {
          setMessage("Cảm ơn bạn, bạn đã đăng ký email này rồi!");
          setMessageColor("green.500");
        } else {
          if (
            e.response.data.message.includes(
              "Customer validation failed: email: "
            )
          ) {
            setMessage(e.response.data.message.split(":")[2]);
            setMessageColor("red.500");
          } else {
            setMessage("Something went wrong!");
            setMessageColor("red.500");
          }
        }
      });
  };
  return (
    <Container maxW="container.fluid" centerContent bg="gray.100" textStyle="p">
      <Flex
        w="100%"
        maxW="container.xxl"
        mt="1.5rem"
        pt={"2rem"}
      >
        <VStack w="100%">
          <Wrap justify={"space-evenly"} gap={6} mb={"2rem"}>
            <GridItem w={isDesktop ? "30%" : "95%"} py={"3rem"}>
              <VStack spacing="1rem">
                <Text fontWeight={"bold"}>Liên kết</Text>
                {pages.map((pg, id) => {
                  return (
                    <Button
                      key={id}
                      colorScheme="black"
                      variant="link"
                      onClick={() => {
                        navigate(`/info/${pg.routeName}`);
                      }}
                    >
                      {pg.name}
                    </Button>
                  );
                })}
              </VStack>
            </GridItem>
            <GridItem w={isDesktop ? "30%" : "95%"} py={"3rem"}>
              <VStack>
                <Text fontSize="lg">
                  Đăng ký để nhận thông tin về các chương trình ưu đãi, sự kiện,
                  dịch vụ và các BST mới sớm nhất từ Kala
                </Text>

                <FormControl>
                  <HStack>
                    <Input
                      type="email"
                      variant="outline"
                      placeholder="Nhập email của bạn"
                      borderColor="black"
                      borderRadius="2rem"
                      borderWidth="2px"
                      value={customer.email}
                      onChange={(e) => {
                        setCustomer({ ...customer, email: e.target.value });
                        setMessage("");
                      }}
                      textColor={"black"}
                    />
                    <Button
                      variant="solid"
                      borderRadius="2rem"
                      bg="black"
                      color="white"
                      px="2rem"
                      _hover={{
                        backgroundColor: "white",
                        color: "black",
                      }}
                      transitionDuration={"0.25s"}
                      onClick={handleSubscribe}
                    >
                      Đăng ký
                    </Button>
                  </HStack>
                  <FormHelperText color={messageColor}>
                    {message}
                  </FormHelperText>
                </FormControl>
              </VStack>
            </GridItem>
            <GridItem w={isDesktop ? "30rem" : "85%"}>
              <VStack spacing="1rem">
                <Heading size="md">Hotline 0397 441 826</Heading>
                <Text>Địa chỉ cửa hàng:</Text>
                <Text>80/20 Hoàng Hoa Thám, phường 7, Bình Thạnh, TPHCM</Text>

                <ButtonGroup>
                  <a
                    href="https://www.facebook.com/profile.php?id=100095039976280"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton
                      me={5}
                      aria-label="Go to kalacandela facebook page"
                      bgColor="transparent"
                      icon={<FaFacebook size={"1.75rem"} />}
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/kalacandela/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton
                      me={5}
                      aria-label="Go to kalacandela facebook page"
                      bgColor="transparent"
                      icon={<FaInstagram size={"1.75rem"} />}
                    />
                  </a>
                  <Button
                    variant="outline"
                    borderColor="black"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </Button>
                </ButtonGroup>
              </VStack>
            </GridItem>
          </Wrap>

          <Text
            className="text-center"
            color={"blackAlpha.600"}
            fontSize={"xs"}
          >
            Developed by{" "}
            <a href="https://tmcdev.tech" target="_blank" rel="noreferrer">
              TMC co dev
            </a>
          </Text>
        </VStack>
      </Flex>
    </Container>
  );
};

export default Footer;
