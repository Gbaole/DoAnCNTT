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
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useDispatch } from "react-redux";
import ProductCard from "../widgets/ProductCard";
import HomeHeader from "../layout/HomeHeader";
import { ViewIcon } from "@chakra-ui/icons";
import { IoHeart } from "react-icons/io5";
import { getHomeUI } from "../../API/Pages";
import { setLoading } from "../../Redux/Ducks/notyfyDux";
import { getCategory, getPages } from "../../Redux/Ducks/uiDux";

function HomeScreen() {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const dispatch = useDispatch();
  const [home, setHome] = useState({
    product: [],
    article: [],
    component: {
      carouselImgs: [],
      texts: [],
      imgs: [],
    },
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getPages());
    try {
      dispatch(setLoading(true));
      getHomeUI().then(({ data }) => {
        setHome(data);
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <>
      <HomeHeader />
      <Box w="100%" minH="100vh" mx={0}>
        <Container maxW="container.xxl" minH="100vh" mb={28} padding={0}>
          {isDesktop
            ? DesktopLayout({
                navigate,
                carouselImgs: home.component.carouselImgs,
              })
            : MobileLayout({
                navigate,
                carouselImgs: home.component.carouselImgs,
              })}
          <Flex
            alignItems="center"
            justifyContent="center"
            my="2em"
            mx={isDesktop ? "7rem" : "0rem"}
          >
            <Text fontSize="2xl" fontWeight="bold">
              NEW PRODUCT
            </Text>
          </Flex>
          <Wrap w={"100%"} justify={"center"}>
            {home.product.map((item, id) => {
              return <ProductCard item={item} key={id} navigate={navigate} />;
            })}
          </Wrap>
          <Flex
            alignItems="center"
            justifyContent="center"
            my="2em"
            mx={isDesktop ? "7rem" : "0rem"}
          >
            <VStack>
              <Button
                variant="link"
                color="black"
                mt="2rem"
                mb="5rem"
                onClick={() => navigate("/collections/all-products/0")}
              >
                <Text fontSize="xl" as="u">
                  Xem thêm
                </Text>
              </Button>
              <Box>
                <VStack px={isDesktop ? undefined : "1rem"}>
                  {home.component.texts.length > 0 && (
                    <Heading fontFamily="body" fontWeight={"700"}>
                      {home.component.texts[0].heading}
                    </Heading>
                  )}
                  {home.component.texts.length > 0 && (
                    <Text fontSize="xl" fontWeight={600}>
                      {home.component.texts[0].caption}
                    </Text>
                  )}
                </VStack>
              </Box>
            </VStack>
          </Flex>
          <Flex>
            <HStack spacing="0rem">
              {isDesktop ? (
                <>
                  {home.component.imgs.map((img, id) => {
                    return (
                      <Box key={id}>
                        <Image
                          h="40vh"
                          w="40vw"
                          objectFit="cover"
                          src={img}
                          alt="scented candles"
                        ></Image>
                      </Box>
                    );
                  })}
                </>
              ) : (
                <>
                  {home.component.imgs.slice(0, 3).map((img, id) => {
                    return (
                      <Box key={id}>
                        <Image
                          h="40vh"
                          w="40vw"
                          objectFit="cover"
                          src={img}
                          alt="scented candles"
                        ></Image>
                      </Box>
                    );
                  })}
                </>
              )}
            </HStack>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            my="2em"
            mx={isDesktop ? "7rem" : "0rem"}
          >
            <Flex w={"100%"} flexDir={"column"}>
              <Center>
                <Heading size="xl" px="2.5rem">
                  KALA{`'`}S BLOG
                </Heading>
              </Center>
              <Wrap w={"100%"} justify={"center"}>
                {home.article.map((newsItem, id) => {
                  return (
                    <a key={id} href={`/news/find/${newsItem._id}`}>
                      <Card
                        m={isDesktop ? "2rem" : "0.5rem"}
                        maxW={"30rem"}
                        // maxH={"40rem"}
                        _hover={{ transform: "scale(1.05, 1.05)" }}
                        transitionDuration={"0.25s"}
                        borderRadius={0}
                      >
                        {newsItem.coverImage.length > 0 && (
                          <Image
                            src={newsItem.coverImage[0].url}
                            alt={newsItem.coverImage[0].name}
                            h={"20rem"}
                            objectFit={"cover"}
                          ></Image>
                        )}
                        <CardBody>
                          <Stack px={isDesktop ? "1rem" : undefined}>
                            <Heading fontSize={"3xl"}>
                              {newsItem.heading}
                            </Heading>
                            <Text
                              noOfLines={isDesktop ? 3 : 4}
                              fontWeight={"600"}
                              fontSize={18}
                            >
                              {newsItem.caption}
                            </Text>
                          </Stack>
                        </CardBody>
                        <CardFooter>
                          <Flex align={"center"} justify={"end"} w={"100%"}>
                            <ViewIcon boxSize={"1.5rem"} />
                            <Text ml={"0.5rem"} mr={"1rem"}>
                              {newsItem.view}
                            </Text>

                            <IoHeart size={"1.5rem"} />
                            <Text ml={"0.5rem"}>{newsItem.like}</Text>
                          </Flex>
                        </CardFooter>
                      </Card>
                    </a>
                  );
                })}
              </Wrap>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}

export default HomeScreen;

const DesktopLayout = ({ navigate, carouselImgs }) => (
  <Box w="100%">
    <Box transform="translate(0,0rem)">
      <Carousel zIndex="2" showThumbs={false} showIndicators={false}>
        {carouselImgs.map((img, id) => {
          return (
            <Flex key={id} m={0} p={0} pos={"relative"} zIndex={1}>
              <Flex
                w={"100%"}
                bgImage={img.url}
                bgAttachment={"fixed"}
                bgSize={"cover"}
                bgPos={"center"}
                h="40rem"
              >
                <Box
                  position="absolute"
                  fontWeight="bold"
                  zIndex={3}
                  maxWidth="50%"
                  top="50%"
                  transform="translateY(-50%)"
                  p={"2rem"}
                  align="flex-end"
                  right="2rem"
                  bg={img.heading ? "rgba(255,255,255,0.5)" : "transparent"}
                  backdropFilter={img.heading ? "blur(10px)" : undefined}
                >
                  <Text
                    fontFamily="heading"
                    fontWeight={"extrabold"}
                    fontSize={{ base: "4xl", lg: "6xl" }}
                    textAlign={"end"}
                  >
                    {img.heading}
                  </Text>
                  <Text textAlign={"end"}>{img.content}</Text>
                  <Button
                    bg="black"
                    color="white"
                    variant="solid"
                    borderRadius="0px"
                    size="md"
                    px="3rem"
                    py={"2rem"}
                    fontSize={"xl"}
                    my="2rem"
                    _hover={{
                      transform: "scale(1.05, 1.05)",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    transitionDuration={"0.25s"}
                    onClick={() => navigate("/collections/all-products/0")}
                  >
                    SHOP NOW
                  </Button>
                </Box>
              </Flex>
            </Flex>
          );
        })}
      </Carousel>
    </Box>
  </Box>
);

const MobileLayout = ({ navigate, carouselImgs }) => (
  <Box alignItems="center">
    <Carousel zIndex="2" showThumbs={false}>
      {carouselImgs.map((img, id) => {
        return (
          <Flex key={id} justifyContent="center" alignItems="center">
            <Image h="60vh" w={"100%"} objectFit="cover" src={img.url} />
            <Button
              position="absolute"
              bg="black"
              color="white"
              variant="solid"
              borderRadius="0px"
              size="sm"
              top="75%"
              left="50%"
              transform="translateX(-50%)"
              px="2rem"
              my="2rem"
              _hover={{}}
              onClick={() => navigate("/all-products/0")}
            >
              SHOP NOW
            </Button>
          </Flex>
        );
      })}
    </Carousel>
  </Box>
);
