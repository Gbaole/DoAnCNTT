import {
  Box,
  Container,
  Flex,
  HStack,
  useBreakpointValue,
  SimpleGrid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Input,
  IconButton,
  Wrap,
} from "@chakra-ui/react";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, showToast } from "../../Redux/Ducks/notyfyDux";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../widgets/ProductCard";
import { GetAllProduct } from "../../API/Product";

const Collections = () => {
  const { cat, skip } = useParams();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const categories = useSelector((state) => state.ui.category);
  const dispatch = useDispatch();
  const [allProduct, setAllProduct] = useState();
  useEffect(() => {
    dispatch(setLoading(true));
    GetAllProduct(skip, 20, cat)
      .then((res) => {
        setAllProduct(res.data);
        setItems(res.data.products);
      })
      .catch((e) => {
        dispatch(
          showToast({
            title: e.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [skip, cat, dispatch]);

  return (
    <Box w="100%" pt={"4rem"} minH="80vh">
      <Container maxW={isDesktop ? "90vw" : "100vw"} minH="80vh" mt="3rem">
        <Stack direction={["column", "row"]} spacing="0px" mx="5rem">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderRadius="0"
              variant="ghost"
              borderColor="black"
              borderWidth="1px"
            >
              COLLECTION
            </MenuButton>
            <MenuList>
              <MenuItem
                value={"all-products"}
                fontFamily={"heading"}
                fontSize={"xl"}
                _hover={{ bg: "secondary.200" }}
                onClick={(e) => {
                  console.log(e.target.value);
                  if (e.target.value == "all-products") {
                    setItems(allProduct.products);
                  } else {
                    setItems(
                      items.filter((item) => item.category == e.target.value)
                    );
                  }
                }}
              >
                Tất cả sản phẩm
              </MenuItem>
              {categories.map((cat, id) => {
                return (
                  <MenuItem
                    key={id}
                    value={cat.routeName}
                    fontFamily={"heading"}
                    fontSize={"xl"}
                    _hover={{ bg: "secondary.200" }}
                    onClick={(e) => {
                      setItems(
                        items.filter((item) => item.category == e.target.value)
                      );
                    }}
                  >
                    {cat.name}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>

          <HStack w="80%" spacing="0px">
            <Input
              placeholder="Tìm kiếm"
              borderRadius="0"
              variant="ghost"
              borderColor="black"
              borderWidth="1px"
            />
            <IconButton
              variant="ghost"
              borderRadius="0"
              borderColor="black"
              borderWidth="1px"
              icon={<SearchIcon />}
            />
          </HStack>
        </Stack>

        <Wrap justify="center">
          {items.map((item, id) => {
            return <ProductCard item={item} navigate={navigate} key={id} />;
          })}
        </Wrap>
      </Container>
    </Box>
  );
};

export default Collections;
