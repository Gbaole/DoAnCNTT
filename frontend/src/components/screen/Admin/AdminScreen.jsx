import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Category from "./Category";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "./AllProduct";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Orders from "./Orders";
import NewsManage from "./NewsManagement";
import NewsEditor from "./NewsEditor";
import InfoPage from "./InfoPage";

function AdminScreen() {
  const navigate = useNavigate();
  const { name } = useParams();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const textColor = useColorModeValue("primary.100", "black");

  let mainContainer;
  switch (name) {
    case "category":
      mainContainer = <Category />;
      break;
    case "allproduct":
      mainContainer = <AllProduct />;
      break;
    case "addProduct":
      mainContainer = <AddProduct />;
      break;
    case "editProduct":
      mainContainer = <EditProduct />;
      break;
    case "orders":
      mainContainer = <Orders />;
      break;
    case "news":
      mainContainer = <NewsManage />;
      break;
    case "addArticle":
      mainContainer = <NewsEditor />;
      break;
    case "editArticle":
      mainContainer = <NewsEditor />;
      break;
    case "infopage":
      mainContainer = <InfoPage />;
      break;
    default:
      break;
  }
  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      {!isDesktop ? (
        <HStack overflowX="auto">
          {options.map((option, id) =>
            OptionRowMobile({ option, id, route: name, navigate, textColor })
          )}
        </HStack>
      ) : null}
      <HStack minH="90%" align={"flex-start"}>
        {isDesktop ? (
          <Box h="xl" shadow="xl" padding="4" borderRadius="2xl">
            <VStack w="auto" alignItems="start">
              {options.map((option, id) =>
                OptionRow({ option, id, route: name, navigate, textColor })
              )}
            </VStack>
          </Box>
        ) : null}
        <Box
          maxW={isDesktop ? "80%" : "100%"}
          w={"100%"}
          minH="xl"
          shadow="xl"
          padding="4"
          borderRadius="2xl"
          py={"2rem"}
        >
          {mainContainer}
        </Box>
      </HStack>
    </Box>
  );
}

export default AdminScreen;

const options = [
  {
    title: "Danh sách sản phẩm",
    icon: "/icons/product.svg",
    name: "allproduct",
    href: "/administrator/allproduct/0/20",
  },
  {
    title: "Danh mục sản phẩm",
    icon: "/icons/dashboard.svg",
    name: "category",
    href: "/administrator/category/0/20",
  },
  {
    title: "Đơn hàng",
    icon: "/icons/order.svg",
    name: "orders",
    href: "/administrator/orders/0/20",
  },
  // {
  //   title: "Doanh Thu",
  //   icon: "/icons/money.svg",
  //   name: "revenue",
  //   href: "/administrator/revenue/0/20",
  // },
  {
    title: "Trang thông tin",
    icon: "/icons/user.svg",
    name: "infopage",
    href: "/administrator/infopage/0/20",
  },
  {
    title: "Tin tức",
    icon: "/icons/product.svg",
    name: "news",
    href: "/administrator/news/0/20",
  },
];

const OptionRow = ({ option, id, route, navigate, textColor }) => {
  return (
    <Box
      w="100%"
      key={id}
      onClick={() => {
        navigate(option.href);
      }}
      style={{ padding: "1.5rem" }}
      bg={route == option.name ? "secondary.200" : undefined}
      color={route == option.name ? "white" : undefined}
      borderRadius="xl"
      shadow={route == option.name ? "xl" : undefined}
    >
      <HStack w="auto">
        <Image src={option.icon} w="1.5rem" />
        <Text
          color={route == option.name ? textColor : undefined}
          fontWeight={route == option.name ? "bold" : "normal"}
        >
          {option.title}
        </Text>
      </HStack>
    </Box>
  );
};
const OptionRowMobile = ({ option, id, route, navigate, textColor }) => {
  return (
    <Box
      w="auto"
      key={id}
      onClick={() => {
        navigate(option.href);
      }}
      style={{ padding: "1.5rem" }}
      bg={route == option.name ? "secondary.200" : undefined}
      color={route == option.name ? "white" : undefined}
      borderRadius="xl"
      shadow={route == option.name ? "xl" : undefined}
    >
      <VStack w="5rem">
        <Image src={option.icon} w="1.5rem" />
        <Text
          color={route == option.name ? textColor : undefined}
          fontWeight={route == option.name ? "bold" : "normal"}
          textAlign="center"
        >
          {option.title}
        </Text>
      </VStack>
    </Box>
  );
};
