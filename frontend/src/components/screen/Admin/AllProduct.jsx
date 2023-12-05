import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Select,
  Switch,
  Text,
  Tooltip,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetAllProduct, deleteProduct } from "../../../API/Product";
import { setLoading, showToast } from "../../../Redux/Ducks/notyfyDux";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../widgets/DynamicTable";
import {
  DragHandleIcon,
  HamburgerIcon,
  AddIcon,
  ViewIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  convertCurrency,
  getCloudinaryVideoThumbnail,
} from "../../../Utils/toolkits";
import { IoSettingsSharp } from "react-icons/io5";
import Paginator from "../../widgets/Paginator";
import { FaBarcode } from "react-icons/fa";
import BarcodeModal from "../../widgets/BarcodeModal";
import DangerConfirmDialog from "../../widgets/DangerConfirmDialog";

function AllProduct(props) {
  const [filter, setFilter] = useState("all-products");
  const [productsObject, setProductsObject] = useState(prodObj);
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState(0);
  const navigate = useNavigate();
  const { skip, limit } = useParams();
  const [showBC, setShowBC] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const categories = useSelector((state) => state.ui.category);

  const fetchProduct = (filter, limit, skip) => {
    dispatch(setLoading(true));
    GetAllProduct(skip, limit, filter)
      .then((res) => {
        setProductsObject(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchProduct(filter, limit, skip);
  }, [dispatch, filter, limit, skip]);

  const handleDeleteProduct = (id) => {
    dispatch(setLoading(true));
    deleteProduct(id)
      .then(() => {
        dispatch(
          showToast({
            title: "Xóa sản phẩm thành công!",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
        );
        fetchProduct(filter, limit, skip);
        setShowDelete(null);
      })
      .catch((e) => {
        dispatch(
          showToast({
            title: "Xóa sản phẩm thất bại! " + e.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <>
      {DangerConfirmDialog({
        isOpen: showDelete,
        onClose: () => {
          setShowDelete(null);
        },
        confirmHandler: ({ _id }) => {
          handleDeleteProduct(_id);
        },
      })}
      {BarcodeModal({ setShowBC, showBC })}
      <Container justifyContent="start" maxW="container.xl">
        <Heading mb={3}>Tất cả sản phẩm</Heading>
        <HStack justify="space-between">
          <Select
            w={"auto"}
            onChange={({ target }) => {
              setFilter(target.value);
            }}
          >
            <option value={"all-products"}>All</option>

            {categories.map((cat, id) => {
              return (
                <option key={id} value={cat.routeName}>
                  {cat.routeName}
                </option>
              );
            })}
          </Select>
          <Flex align={"center"}>
            <Button
              borderRadius="2xl"
              onClick={() => {
                navigate("/administrator/addProduct/0/0");
              }}
              mr={2}
            >
              <Tooltip label="Add product" mr={2}>
                <AddIcon />
              </Tooltip>
            </Button>

            <DragHandleIcon color="primary.100" mr={2} />
            <Box mr={2}>
              <Switch
                onChange={(e) => {
                  setViewMode(e.target.checked);
                }}
              />
            </Box>
            <HamburgerIcon color="primary.100" mr={2} />
          </Flex>
        </HStack>
        <HStack w="100%" my={5}>
          {viewMode == 1 ? (
            DynamicTable({
              array: productsObject.products,
              definition: productsObject.definition,
            })
          ) : (
            <Wrap spacing={5} w={"100%"} justify={"flex-start"}>
              {productsObject.products.map((product, id) => (
                <Box key={id} p={5}>
                  {ProductCard({
                    prod: product,
                    id,
                    navigate,
                    setShowBC,
                    setShowDelete,
                  })}
                </Box>
              ))}
            </Wrap>
          )}
        </HStack>
        {Paginator({
          count: productsObject.productCount,
          skip,
          setSkip: (sk) => {
            navigate(`/administrator/allproduct/${sk}/${limit}`);
          },
          limit,
        })}
      </Container>
    </>
  );
}

export default AllProduct;

const ProductCard = ({ prod, id, navigate, setShowBC, setShowDelete }) => {
  return (
    <Card
      key={id}
      mb={3}
      shadow="md"
      className="myHoverZoomIn"
      transitionDuration={"0.5s"}
      _hover={{ transform: "scale(1.05, 1.05)" }}
    >
      <CardBody>
        <VStack>
          <Flex minW={"15rem"} justify={"space-between"} w={"100%"}>
            <Text
              fontSize={"lg"}
              fontWeight={"bold"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              maxW={"75%"}
            >
              {prod.name}
            </Text>
            <Text>{prod.ratings}/5</Text>
          </Flex>
          <Flex w={"100%"}>
            <Text w={"auto"}>Danh mục: {prod.category}</Text>
          </Flex>
          <Flex minW={"10rem"} w={"100%"} justify={"space-between"}>
            {/* <Text>{prod.stock}</Text> */}
            <Text>{convertCurrency(prod.price)}</Text>
          </Flex>
        </VStack>
      </CardBody>
      <Image
        src={getCloudinaryVideoThumbnail(prod.thumbnail[0]?.url)}
        alt={prod.thumbnail[0]?.name}
        h={"10rem"}
        w={"100%"}
        maxW={"18rem"}
        objectFit={"cover"}
      />
      <CardFooter>
        <Flex justify={"space-between"} w={"100%"}>
          <Button
            bgColor={"transparent"}
            onClick={() => {
              navigate(`/product/${prod._id}`);
            }}
          >
            <ViewIcon />
          </Button>
          <Button
            bgColor={"transparent"}
            onClick={() => {
              setShowBC(prod._id);
            }}
          >
            <FaBarcode />
          </Button>
          <Button
            bgColor={"transparent"}
            onClick={() => {
              setShowDelete(prod);
            }}
          >
            <DeleteIcon color={"red.500"} />
          </Button>
          <Button
            bgColor={"transparent"}
            onClick={() => {
              navigate(`/administrator/editProduct/${prod._id}/0`);
            }}
          >
            <IoSettingsSharp />
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};

const prodObj = {
  count: 0,
  products: [],
};
