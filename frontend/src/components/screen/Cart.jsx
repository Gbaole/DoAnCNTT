import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertCurrency } from "../../Utils/toolkits";
import { BsDashCircle, BsPlusCircle, BsTrash } from "react-icons/bs";
import {
  addQuantity,
  emptyCart,
  removeFromCart,
  subtractQuantity,
} from "../../Redux/Ducks/cart";
import { getAllDistrict, getAllProvince, getAllWard } from "../../API/Province";
import { newOrder } from "../../API/Order";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../Redux/Ducks/notyfyDux";
import { emailValidate, vietnamPhoneNumberValidate } from "../../Utils/Regex";

function FinishOrder(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cpnWidth = useBreakpointValue({
    base: "100%",
    xs: "100%",
    sm: "90%",
    md: "80%",
    lg: "50%",
    xl: "50%",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  // const [coupon, setCoupon] = useState(false);
  const [formData, setFormData] = useState(initForm(cart));
  // console.log(formData);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setFormData({ ...formData, ...userInfo });
    } catch (e) {
      console.log(e);
    }
    getAllProvince()
      .then((res) => {
        setProvinces(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handelSelectProvince = (p) => {
    setFormData({ ...formData, customerCity: p.name });
    getAllDistrict(p.code).then((res) => {
      setDistricts(res.data.districts);
    });
  };

  const handelSelectDistrict = (d) => {
    setFormData({ ...formData, customerDistrict: d.name });
    getAllWard(d.code)
      .then((res) => {
        setWards(res.data.wards);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // console.log(formData);
    formData.cart = cart;
    newOrder(formData)
      .then((res) => {
        navigate("/");
        dispatch(
          showToast({
            title: "Đơn hàng được tạo thành công",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        );
        dispatch(emptyCart());
      })
      .catch((e) => {
        console.log(e);
        dispatch(
          showToast({
            title: e.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      });
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box w="100%" pt={"4rem"} minH="80vh">
      <Container maxW="container.xl" p="2em">
        {isDesktop ? (
          <Flex>
            <Flex
              w={cpnWidth}
              flexDirection={"column"}
              my={"2rem"}
              align={"center"}
            >
              <Card
                borderRadius={"none"}
                shadow={"none"}
                my={4}
                w={"95%"}
                mx={"1rem"}
              >
                <CardBody>
                  <Heading size={"md"}>Thông tin liên lạc</Heading>
                  <FormControl my={4}>
                    <Input
                      name="customerEmail"
                      onChange={handleInputChange}
                      value={formData.customerEmail}
                      placeholder="Email của bạn"
                      type="email"
                      errorBorderColor="black"
                      isInvalid={
                        formData.customerEmail == "" ||
                        !emailValidate.test(formData.customerEmail)
                      }
                    />
                    <FormHelperText mt="1rem">
                      Chúng tôi sẽ gửi mail xác nhận đơn hàng cho bạn qua địa
                      chỉ mail này
                    </FormHelperText>
                  </FormControl>
                  <FormControl my={4}>
                    <FormLabel fontSize={"xl"} mb="1rem">
                      Thông tin giao hàng
                    </FormLabel>
                    <Input
                      errorBorderColor="black"
                      isInvalid={formData.customerName == ""}
                      name="customerName"
                      onChange={handleInputChange}
                      value={formData.customerName}
                      placeholder="Tên của bạn"
                      my="0.5rem"
                    />

                    <Box>
                      <Input
                        name="customerHomeSt"
                        onChange={handleInputChange}
                        value={formData.customerHomeSt}
                        placeholder="Địa chỉ/đường"
                        errorBorderColor="black"
                        isInvalid={formData.customerHomeSt == ""}
                      />
                      <Select
                        my="0.5rem"
                        borderColor="black"
                        errorBorderColor="black"
                        isInvalid={!formData.customerCity}
                        placeholder="Chọn tỉnh/thành phố"
                        onChange={(e) => {
                          if (e.target.value) {
                            handelSelectProvince(JSON.parse(e.target.value));
                          } else {
                            setWards([]);
                            setDistricts([]);
                          }
                        }}
                      >
                        {provinces.map((p) => {
                          return (
                            <option key={p.code} value={JSON.stringify(p)}>
                              {p.name}
                            </option>
                          );
                        })}
                      </Select>
                      <HStack spacing="0.5rem" my="0.5rem">
                        <Select
                          isDisabled={districts.length == 0}
                          borderColor="black"
                          errorBorderColor="black"
                          placeholder="Chọn quận/huyện"
                          onChange={(e) => {
                            if (e.target.value) {
                              handelSelectDistrict(JSON.parse(e.target.value));
                            } else {
                              setWards([]);
                            }
                          }}
                        >
                          {districts &&
                            districts.map((p) => {
                              return (
                                <option key={p.code} value={JSON.stringify(p)}>
                                  {p.name}
                                </option>
                              );
                            })}
                        </Select>
                        <Select
                          isDisabled={wards.length == 0}
                          borderColor="black"
                          errorBorderColor="black"
                          placeholder="Chọn phường/xã"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              customerWard: e.target.value,
                            });
                          }}
                        >
                          {wards &&
                            wards.map((p) => {
                              return (
                                <option key={p.code} value={p.name}>
                                  {p.name}
                                </option>
                              );
                            })}
                        </Select>
                      </HStack>
                    </Box>
                    <Input
                      name="customerPhone"
                      onChange={handleInputChange}
                      value={formData.customerPhone}
                      placeholder="Số điện thoại"
                      errorBorderColor="black"
                      isInvalid={
                        !vietnamPhoneNumberValidate.test(formData.customerPhone)
                      }
                      type="tel"
                    />
                  </FormControl>

                  <Flex justify="end">
                    <Button
                      onClick={handleSubmit}
                      bg="black"
                      color="white"
                      size="lg"
                    >
                      Đặt hàng
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>

            <Flex
              w={cpnWidth}
              flexDirection={"column"}
              my={"2rem"}
              align={"center"}
              py={4}
            >
              <Card borderRadius={"xl"} shadow={"lg"} mx={2} w={"95%"}>
                <CardBody px={cpnWidth == "100%" ? 0 : undefined}>
                  {cart.count === 0 ? (
                    <Text>Bạn chưa có đơn hàng nào trong giỏ</Text>
                  ) : (
                    <>
                      {cart.products.map((item, id) => {
                        return (
                          <Card w={"100%"} key={id} my={2} shadow={"none"}>
                            <CardBody px={cpnWidth == "100%" ? 0 : undefined}>
                              <HStack>
                                <Image
                                  src={item.image}
                                  w={"6rem"}
                                  borderRadius={"none"}
                                  mr={2}
                                />
                                <Box w={"90%"}>
                                  <Wrap
                                    w={"100%"}
                                    justify={"space-between"}
                                    mb="1rem"
                                  >
                                    <Heading size={"md"}>{item.name}</Heading>
                                    <Text fontSize={"lg"}>
                                      {convertCurrency(item.price)}
                                    </Text>
                                  </Wrap>
                                  <Divider borderColor="black" />
                                  <Wrap
                                    w={"100%"}
                                    justify={"space-between"}
                                    mt="1rem"
                                  >
                                    <Text fontSize={"lg"}>Số lượng</Text>
                                    <Flex align={"center"} w={"min"} py={1}>
                                      <IconButton
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
                                        size={"md"}
                                        value={item.quantity}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                        }}
                                        // w={"20%"}
                                        minW={"3rem"}
                                        borderRadius={"0.5rem"}
                                        mx={2}
                                      />
                                      {/* <Text>{item.quantity}</Text> */}
                                      <IconButton
                                        variant="ghost"
                                        onClick={() => {
                                          dispatch(
                                            addQuantity({
                                              pos: id,
                                              price: item.price,
                                            })
                                          );
                                        }}
                                        icon={<BsPlusCircle size={"1.25rem"} />}
                                      />
                                    </Flex>
                                  </Wrap>
                                </Box>
                                <Flex>
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
                    </>
                  )}
                </CardBody>
              </Card>
              <Card borderRadius={"none"} shadow={"none"} my={4} w={"95%"}>
                <CardBody>
                  <Flex w={"100%"} justify={"space-between"}>
                    <Heading size={"md"}>Tổng số lượng</Heading>
                    <Text fontSize={"lg"}>{cart.count}</Text>
                  </Flex>
                  <Flex w={"100%"} justify={"space-between"}>
                    <Heading size={"md"}>Tổng giá tiền</Heading>
                    <Text fontSize={"lg"}>
                      {convertCurrency(cart.totalPrice)}
                    </Text>
                  </Flex>
                  {/* //TODO  coupon*/}
                  {/* <Flex align={"center"}>
                <Checkbox
                  mr={"1rem"}
                  onChange={(e) => {
                    setCoupon(!coupon);
                  }}
                >
                  Sử dụng mã giảm giá:
                </Checkbox>
                {coupon && (
                  <>
                    <Input maxW={"10rem"} />
                    <Button ml={"1rem"}>Áp dụng</Button>
                  </>
                )}
              </Flex> */}
                </CardBody>
              </Card>
            </Flex>
          </Flex>
        ) : (
          <Flex direction="column">
            <Flex
              w={cpnWidth}
              flexDirection={"column"}
              my={"2rem"}
              align={"center"}
              py={4}
            >
              <Card borderRadius={"xl"} shadow={"lg"} mx={2} w={"95%"}>
                <CardBody px={cpnWidth == "100%" ? 0 : undefined}>
                  {cart.count === 0 ? (
                    <Text>Bạn chưa có đơn hàng nào trong giỏ</Text>
                  ) : (
                    <>
                      {cart.products.map((item, id) => {
                        return (
                          <Card w={"100%"} key={id} my={2} shadow={"none"}>
                            <CardBody px={cpnWidth == "100%" ? 0 : undefined}>
                              <HStack>
                                <Image
                                  src={item.image}
                                  w={"6rem"}
                                  borderRadius={"none"}
                                  mr={2}
                                />
                                <Box w={"90%"}>
                                  <Wrap
                                    w={"100%"}
                                    justify={"space-between"}
                                    mb="1rem"
                                  >
                                    <Heading size={"md"}>{item.name}</Heading>
                                    <Text fontSize={"lg"}>
                                      {convertCurrency(item.price)}
                                    </Text>
                                  </Wrap>
                                  <Divider borderColor="black" />
                                  <Wrap
                                    w={"100%"}
                                    justify={"space-between"}
                                    mt="1rem"
                                  >
                                    <Text fontSize={"lg"}>Số lượng</Text>
                                    <Flex align={"center"} w={"min"} py={1}>
                                      <IconButton
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
                                        size={"md"}
                                        value={item.quantity}
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                        }}
                                        // w={"20%"}
                                        minW={"3rem"}
                                        borderRadius={"0.5rem"}
                                        mx={2}
                                      />
                                      {/* <Text>{item.quantity}</Text> */}
                                      <IconButton
                                        variant="ghost"
                                        onClick={() => {
                                          dispatch(
                                            addQuantity({
                                              pos: id,
                                              price: item.price,
                                            })
                                          );
                                        }}
                                        icon={<BsPlusCircle size={"1.25rem"} />}
                                      />
                                    </Flex>
                                  </Wrap>
                                </Box>
                                <Flex>
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
                    </>
                  )}
                </CardBody>
              </Card>
              <Card borderRadius={"none"} shadow={"none"} my={4} w={"95%"}>
                <CardBody>
                  <Flex w={"100%"} justify={"space-between"}>
                    <Heading size={"md"}>Tổng số lượng</Heading>
                    <Text fontSize={"lg"}>{cart.count}</Text>
                  </Flex>
                  <Flex w={"100%"} justify={"space-between"}>
                    <Heading size={"md"}>Tổng giá tiền</Heading>
                    <Text fontSize={"lg"}>
                      {convertCurrency(cart.totalPrice)}
                    </Text>
                  </Flex>
                  {/* TODO  coupon*/}
                  {/* <Flex align={"center"}>
                <Checkbox
                  mr={"1rem"}
                  onChange={(e) => {
                    setCoupon(!coupon);
                  }}
                >
                  Sử dụng mã giảm giá:
                </Checkbox>
                {coupon && (
                  <>
                    <Input maxW={"10rem"} />
                    <Button ml={"1rem"}>Áp dụng</Button>
                  </>
                )}
              </Flex> */}
                </CardBody>
              </Card>
            </Flex>

            <Flex
              w={cpnWidth}
              flexDirection={"column"}
              my={"2rem"}
              align={"center"}
            >
              <Card
                borderRadius={"none"}
                shadow={"none"}
                my={4}
                w={"95%"}
                mx={"1rem"}
              >
                <CardBody>
                  <Heading size={"md"}>Contact information</Heading>
                  <FormControl my={4}>
                    <Input
                      name="customerEmail"
                      onChange={handleInputChange}
                      value={formData.customerEmail}
                      placeholder="Email của bạn"
                      type="email"
                      errorBorderColor="black"
                      isInvalid={
                        formData.customerEmail == "" ||
                        !emailValidate.test(formData.customerEmail)
                      }
                    />
                    <FormHelperText mt="1rem">
                      Chúng tôi sẽ gửi mail xác nhận đơn hàng cho bạn qua địa
                      chỉ mail này
                    </FormHelperText>
                  </FormControl>
                  <FormControl my={4}>
                    <FormLabel fontSize={"xl"} mb="1rem">
                      Shipping information
                    </FormLabel>
                    <Input
                      errorBorderColor="black"
                      isInvalid={formData.customerName == ""}
                      name="customerName"
                      onChange={handleInputChange}
                      value={formData.customerName}
                      placeholder="Tên của bạn"
                      my="0.5rem"
                    />

                    <Box>
                      <Input
                        name="customerHomeSt"
                        onChange={handleInputChange}
                        value={formData.customerHomeSt}
                        placeholder="Địa chỉ/đường"
                        errorBorderColor="black"
                        isInvalid={formData.customerHomeSt == ""}
                      />
                      <Select
                        my="0.5rem"
                        borderColor="black"
                        errorBorderColor="black"
                        isInvalid={!formData.customerCity}
                        placeholder="Chọn tỉnh/thành phố"
                        onChange={(e) => {
                          if (e.target.value) {
                            handelSelectProvince(JSON.parse(e.target.value));
                          } else {
                            setWards([]);
                            setDistricts([]);
                          }
                        }}
                      >
                        {provinces.map((p) => {
                          return (
                            <option key={p.code} value={JSON.stringify(p)}>
                              {p.name}
                            </option>
                          );
                        })}
                      </Select>
                      <HStack spacing="0.5rem" my="0.5rem">
                        <Select
                          isDisabled={districts.length == 0}
                          borderColor="black"
                          errorBorderColor="black"
                          placeholder="Chọn quận/huyện"
                          onChange={(e) => {
                            if (e.target.value) {
                              handelSelectDistrict(JSON.parse(e.target.value));
                            } else {
                              setWards([]);
                            }
                          }}
                        >
                          {districts &&
                            districts.map((p) => {
                              return (
                                <option key={p.code} value={JSON.stringify(p)}>
                                  {p.name}
                                </option>
                              );
                            })}
                        </Select>
                        <Select
                          isDisabled={wards.length == 0}
                          borderColor="black"
                          errorBorderColor="black"
                          placeholder="Chọn phường/xã"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              customerWard: e.target.value,
                            });
                          }}
                        >
                          {wards &&
                            wards.map((p) => {
                              return (
                                <option key={p.code} value={p.name}>
                                  {p.name}
                                </option>
                              );
                            })}
                        </Select>
                      </HStack>
                    </Box>
                    <Input
                      name="customerPhone"
                      onChange={handleInputChange}
                      value={formData.customerPhone}
                      placeholder="Số điện thoại"
                      errorBorderColor="black"
                      isInvalid={
                        !vietnamPhoneNumberValidate.test(formData.customerPhone)
                      }
                      type="tel"
                    />
                  </FormControl>

                  <Flex justify="end">
                    <Button
                      onClick={handleSubmit}
                      bg="black"
                      color="white"
                      size="lg"
                    >
                      Đặt hàng
                    </Button>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Flex>
        )}
      </Container>
    </Box>
  );
}

export default FinishOrder;

const initForm = (cart) => ({
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerHomeSt: "",
  customerCity: "",
  customerDistrict: "",
  customerWard: "",
  cart,
});
