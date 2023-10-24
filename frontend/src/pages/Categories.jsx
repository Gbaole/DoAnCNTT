import {
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  return <Flex w="100vw">{isDesktop ? DesktopLayout() : MobileLayout()}</Flex>;
};

export default Categories;

const DesktopLayout = () => (
  <Flex bg="white" mx="6rem" my="2rem" w="100vw">
    <VStack w="100%" px="2rem" mb="2rem">
      <Text fontSize="xl" mx="3rem" my="1rem">
        DANH MỤC
      </Text>
      <Grid templateColumns="repeat(8, 1fr)" gap={6}>
        {items.map((item, id) => {
          return (
            <GridItem key={id} colSpan={1}>
              <Card
                // onClick={() => }
                cursor="pointer"
                w="100%"
                h="100%"
                borderRadius="1rem"
                boxShadow="0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.1)"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <Image
                  borderTopRadius="1rem"
                  src={item.img}
                  alt={item.name}
                  w="100%"
                  h="100%"
                  objectFit="contain"
                />
                <CardBody>
                  <Center>
                    <Heading size="md">{item.name}</Heading>
                  </Center>
                </CardBody>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  </Flex>
);

const MobileLayout = () => <></>;

const items = [
  {
    _id: "1",
    name: "Thời trang nam",
    img: "https://www.anphuoc.com.vn/Data/Sites/1/Product/7189/thumbs/tn-ap-0695-01.jpg",
  },
  {
    _id: "2",
    name: "Thời trang nữ",
    img: "https://bizweb.dktcdn.net/100/419/662/products/65ce886c-4227-417f-8f86-c85f9ae21261.jpg?v=1681007279210",
  },
  {
    _id: "3",
    name: "Điện thoại & phụ kiện",
    img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708",
  },
  {
    _id: "4",
    name: "Máy tính & laptop",
    img: "https://images2.thanhnien.vn/528068263637045248/2023/2/14/macbook-air-m2-1676361464865294752901.jpg",
  },
  {
    _id: "5",
    name: "Đồng hồ",
    img: "https://www.bijouxmedusa.com/cdn/shop/products/50mm-richard-mille-rose-gold-rm11-2-montre-or-bijoux-medusa-homme-quebec-canada-466.jpg?v=1649907496",
  },
  {
    _id: "6",
    name: "Máy ảnh & máy quay phim",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Canon_EOS_6D_Mark_II_by_EF50mm_F1.2L_USM.jpg",
  },
  {
    _id: "7",
    name: "Balo & túi",
    img: "https://bizweb.dktcdn.net/100/343/358/products/balo-laptop-910-14-inch-xam-chi-3.jpg?v=1678675335753",
  },
  {
    _id: "8",
    name: "Giày dép",
    img: "https://d1fufvy4xao6k9.cloudfront.net/images/landings/407/black-chelsea-boots.png",
  },
];
