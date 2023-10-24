import {
  Box,
  Container,
  Flex,
  HStack,
  useBreakpointValue,
  Text,
  Image,
  VStack,
  Card,
  CardBody,
  Heading,
  Button,
  Stack,
  Center,
  Wrap,
  CardFooter,
  Input,
  Grid,
  GridItem,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { AiOutlineThunderbolt, AiOutlineGlobal } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDiscount } from "react-icons/md";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { BsFire } from "react-icons/bs";
import Categories from "./Categories";

const HomeScreen = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();

  return (
    <>
      {/* <Box w="100%" minH="100vh" mx={0}> */}
      <Container maxW="container.xxl" minH="100vh" mb={28} padding={0}>
        {isDesktop
          ? DesktopLayout({
              navigate,
            })
          : MobileLayout({
              navigate,
            })}
      </Container>
      {/* </Box> */}
    </>
  );
};

export default HomeScreen;

const DesktopLayout = ({ navigate }) => (
  <Flex justify="center" py="0rem">
    <VStack>
      {/* <Banner images={["/banner1.svg", "/banner2.svg"]} /> */}
      <Banner />
      <Grid templateColumns="repeat(6, 1fr)" gap={6} mt="2rem">
        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={AiOutlineThunderbolt} boxSize={5}></Icon>
            <Text>Khung giờ săn sale</Text>
          </VStack>
        </GridItem>

        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={TbTruckDelivery} boxSize={5}></Icon>
            <Text>Miễn phí ship</Text>
          </VStack>
        </GridItem>

        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={MdOutlineDiscount} boxSize={5}></Icon>
            <Text>Mã giảm giá</Text>
          </VStack>
        </GridItem>

        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={HiMiniDevicePhoneMobile} boxSize={5}></Icon>
            <Text>Nạp thẻ, dịch vụ & data</Text>
          </VStack>
        </GridItem>

        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={AiOutlineGlobal} boxSize={5}></Icon>
            <Text>Hàng quốc tế</Text>
          </VStack>
        </GridItem>

        <GridItem
          onClick={() => {
            navigate("/");
          }}
          _hover={{
            cursor: "pointer",
            transform: "translateY(-5px)",
          }}
        >
          <VStack>
            <Icon as={BsFire} boxSize={5}></Icon>
            <Text>Bắt trend - Giá sốc</Text>
          </VStack>
        </GridItem>
      </Grid>

      <Flex bg="gray.100">
        <Categories></Categories>
      </Flex>
    </VStack>
  </Flex>
);

const MobileLayout = ({ navigate }) => (
  <Box>
    <Text>Mobile</Text>
  </Box>
);
