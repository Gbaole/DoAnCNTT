import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,

  useBreakpointValue,
  Text,
  Spacer,
  Image,
  
  Heading,
  Button,
  Grid,
  GridItem,
  Card,
  
  CardBody,
  CardFooter,
  Stack,
  Divider,
  ButtonGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  BsCartPlusFill,
  BsFillInfoCircleFill,
} from "react-icons/bs";
import HoverImg from "../widgets/HoverLeftnRightImg";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Ducks/cart";

import { ALL_PRODUCT } from "../../API/KalaURL";
import { setLoading } from "../../Redux/Ducks/notyfyDux";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${ALL_PRODUCT}?skip=0&limit=10`);
      console.log("Response data:", response.data);
      setItems(response.data.products);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddToCart = (_id) => {
    dispatch(addToCart(_id));
  };

  const handleMoreInfoClick = (_id) => {
    navigate(`/candle/${_id}`);
  };

  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      <Container maxW="container.xl" minH="100vh" p="2em">
        {isDesktop ? (
          <DesktopLayout
            items={items}
            handleAddToCart={handleAddToCart}
            handleMoreInfoClick={handleMoreInfoClick}
          />
        ) : (
          <MobileLayout
            items={items}
            handleAddToCart={handleAddToCart}
            handleMoreInfoClick={handleMoreInfoClick}
          />
        )}
      </Container>
    </Box>
  );
}

export default CartScreen;

const DesktopLayout = ({ items, handleAddToCart, handleMoreInfoClick }) => (
  <Box w="container.xxl" align="center">
    <Box maxW="60vw" align="left" mb="1em">
      {/* Filter Menu */}
    </Box>
    <Grid
      w="60vw"
      templateRows="repeat(3, 1fr)"
      templateColumns="repeat(3, 1fr)"
      gap={8}
      align="left"
    >
      {items.map((item) => (
        <GridItem key={item._id}>
          <Card maxW="sm">
            <CardBody>
              {/* <Image
                src={item.image}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              /> */}
              <HoverImg
                img1={item.image && item.image[0] ? item.image[0].uri : ""}
                img2={item.image && item.image[1] ? item.image[1].uri : ""}
                img3={item.image && item.image[2] ? item.image[2].uri : ""}
              />

              <Stack mt="6" spacing="3">
                <Heading size="md">{item.name}</Heading>
                <Text noOfLines={1}>{item.desc}</Text>
                <Text color="blue.600" fontSize="lg">
                  {item.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="10rem">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={() => {
                    handleAddToCart(item._id);
                  }}
                >
                  {/* <Text ml="0.5em">Thêm vào giỏ hàng</Text> */}
                  <BsCartPlusFill />
                </Button>

                <Button
                  variant="ghost"
                  colorScheme="blue"
                  rightIcon={<BsFillInfoCircleFill />}
                  onClick={() => handleMoreInfoClick(item._id)}
                >
                  Xem Thêm
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </Grid>
  </Box>
);

const MobileLayout = ({ items, handleAddToCart, handleMoreInfoClick }) => (
  <Container maxW="container.xl">
    <Box maxW="60vw" align="left" mb="1em">
      {/* Filter Menu */}
    </Box>
    <SimpleGrid columns={1} spacing={2} align="left">
      {items.map((item) => (
        <Box key={item._id}>
          <Card>
            <CardBody>
              <Image
                objectFit="cover"
                src={item.image}
                alt="Nến thơm"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="xs">{item.name}</Heading>
                <Text noOfLines={1}>{item.desc}</Text>
                <Text color="blue.600" fontSize="lg">
                  {item.price}
                </Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="3">
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleAddToCart(item._id)}
                >
                  <BsCartPlusFill />
                </Button>
                <Spacer />
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => handleMoreInfoClick(item._id)}
                >
                  <BsFillInfoCircleFill />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Box>
      ))}
    </SimpleGrid>
  </Container>
);
