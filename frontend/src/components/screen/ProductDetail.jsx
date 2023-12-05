import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
  Divider,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setLoading } from "../../Redux/Ducks/notyfyDux";
import { PRODUCT_DETAIL } from "../../API/KalaURL";
import { useDispatch } from "react-redux";
import { convertCurrency } from "../../Utils/toolkits";
import AddToCartButton from "../widgets/AddToCartButton";
import { addToCart } from "../../Redux/Ducks/cart";
import { showToast } from "../../Redux/Ducks/notyfyDux";
import TMCProductImageViewer from "../widgets/TMCProductImageViewer";
import "../../quill.css";

function ProductDetail() {
  const [product, setProduct] = useState(initialProduct);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentPT, setCurrentPT] = useState(null);
  const [currentImg, setCurrentImg] = useState();
  const isDesktop = useBreakpointValue({ md: false, lg: true });
  // console.log(product);
  const createMarkup = (string) => {
    return { __html: string };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch(PRODUCT_DETAIL(id));
        const data = await response.json();
        setProduct(data.product); // Access the product object from the response data
        setCurrentImg(data.product.thumbnail[0]._id);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxW={"container.xl"} py={"6rem"} minH={"90vh"}>
      <Wrap w={"100%"} justify={"space-evenly"}>
        <Flex>
          {TMCProductImageViewer({
            images: product.thumbnail,
            currentImg,
            setCurrentImg,
            productTypeArray: product.productType,
            setCurrentPT,
          })}
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }} w={isDesktop ? "40%" : "90%"}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text fontWeight={600} fontSize={"2xl"}>
              {convertCurrency(product.price)}
            </Text>
          </Box>
          <Divider />

          <AddToCartButton
            productType={product.productType}
            confirmHandler={(p) => {
              dispatch(
                addToCart({
                  id: product._id,
                  typeID: p,
                  name: product.productType[p]?.name
                    ? `${product.name} - ${product.productType[p].name}`
                    : product.name,
                  image:
                    p !== null
                      ? product.productType[p]?.image[0]?.url
                      : product.thumbnail[0]?.url,
                  price:
                    p !== null ? product.productType[p].price : product.price,
                })
              );
              dispatch(
                showToast({
                  title: "Thêm vào giỏ hàng thành công!",
                  status: "success",
                  duration: 1000,
                  isClosable: true,
                })
              );
            }}
            ptIndex={currentPT}
            setPtIndex={setCurrentPT}
            setImg={setCurrentImg}
          />
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider />}
          >
            <Box>
              <Box
                dangerouslySetInnerHTML={createMarkup(product.description)}
                className="ql-snow"
                style={{
                  marginTop: "3rem",
                }}
                textStyle="p"
              />
            </Box>
          </Stack>
        </Stack>
      </Wrap>
    </Container>
  );
}

export default ProductDetail;

const initialProduct = {
  _id: "",
  name: "",
  price: 0,
  description: "",
  ratings: 0,
  thumbnail: [],
  productType: [],
  category: "",
  numofReviews: 0,
  createdUser: "",
  reviews: [],
  ecomURL: [],
  createdAt: "",
  __v: 0,
};
