import {
  Box,
  Container,
  Flex,
  HStack,
  useBreakpointValue,
  Text,
  Spacer,
  Wrap,
  Image,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
} from "@chakra-ui/react";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import HoverImg from "../widgets/HoverLeftnRightImg";

function TempHomeScreen() {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box w="100%" pt={"4rem"} minH="100vh" mx={0}>
      <Container maxW="container.xxl" minH="100vh" mb={28} padding={0}>
        {isDesktop ? DesktopLayout(navigate) : MobileLayout(navigate)}
        <Flex alignItems="baseline" mb="1em" mx={isDesktop ? "7rem" : "0rem"}>
          <Text fontSize="2xl" fontWeight="bold">
            Hot New Products
          </Text>
          <Spacer></Spacer>
          <Button fontSize="lg" variant="ghost">
            More &#8212;
          </Button>
        </Flex>
        <Wrap mx={isDesktop ? "3rem" : undefined} justify="center">
          {hotProduct.map((product, id) => {
            return (
              <Card
                key={id}
                style={{ margin: "1rem" }}
                shadow="lg"
                maxW="xs"
                onClick={() => {
                  navigate("/candle/" + id);
                }}
              >
                <CardHeader>
                  <Box>
                    <HoverImg
                      img1={product.img[0]}
                      img2={product.img[1]}
                      img3={product.img[2]}
                    />
                  </Box>
                  <Heading size="md">{product.name}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{product.desc}</Text>
                </CardBody>
                <CardFooter fontWeight="bold">
                  <Spacer />
                  <Text>{product.price}</Text>
                </CardFooter>
              </Card>
            );
          })}
        </Wrap>
      </Container>
    </Box>
  );
}

export default TempHomeScreen;

const DesktopLayout = (navigate) => (
  <Box w="100%">
    <HStack
      alignItems="start"
      transform="translate(0rem, 0.8rem)"
      position="relative"
      zIndex={4}
    >
      <Flex w="100%">
        <Text fontSize="xl" pt="1rem" ms="8rem">
          collections
        </Text>
        <Wrap justify="end">
          {mainTitleDesktop.map((word, id) => (
            <Text
              key={id}
              fontFamily={word.font}
              fontSize={word.size}
              transform={word?.transform}
            >
              {word.text}
            </Text>
          ))}
        </Wrap>
        <Spacer />
        <Box p="1rem" ml="2em">
          <Wrap>
            <Text mb="0.5em" fontWeight="bold" fontStyle="italic">
              Kala Candela
            </Text>
            <Text fontFamily="body"> COLLECTION</Text>
          </Wrap>
          <Text mb="0.5em" fontFamily="body">
            Our blends have been selected by customers. Over the years, we have
            refined and refined our process to provide only the best
          </Text>
          <Text mb="1em" fontWeight="bold">
            Open Collection &#8212;
          </Text>
        </Box>
      </Flex>
    </HStack>

    <Box transform="translate(0,-3rem)" position="relative" zIndex={1}>
      <Carousel zIndex="2" showThumbs={false}>
        {carouselImgs.map((img, id) => {
          return (
            <Flex key={id}>
              <Image maxH="50vh" objectFit="cover" src={img} />
              <Button
                onClick={() => navigate("/about")}
                pos="absolute"
                top="6rem"
                left="7rem"
                variant="ghost"
                borderWidth="2px"
                fontFamily="bodySerif"
              >
                ABOUT US
              </Button>
            </Flex>
          );
        })}
      </Carousel>
    </Box>
  </Box>
);

const MobileLayout = (navigate) => (
  <Box alignItems="center" mt="1em">
    <VStack alignItems="start" w="100%">
      <Wrap w="100%">
        <Text fontSize="2xl">collections</Text>
        <Wrap justify="end" pt="1rem">
          {mainTitle.map((word, id) => (
            <Text
              key={id}
              fontFamily={word.font}
              fontSize={word.size}
              transform={word?.transform}
            >
              {word.text}
            </Text>
          ))}
        </Wrap>
        <Box pt="1rem" ml="2em" mb="3">
          <Wrap>
            <Text mb="0.5em" fontWeight="bold" fontStyle="italic">
              Kala Candela
            </Text>
            <Text> COLLECTION</Text>
          </Wrap>
          <Text mb="0.5em" fontFamily="body">
            Our blends have been selected by customers. Over the years, we have
            refined and refined our process to provide only the best
          </Text>
          <Text mb="1em">Open Collection &#8212;</Text>
        </Box>
      </Wrap>
    </VStack>
    <Box transform="translate(0,-3rem)">
      <Carousel zIndex="2" showThumbs={false}>
        {carouselImgs.map((img, id) => {
          return (
            <Flex key={id}>
              <Image maxH="50vh" objectFit="cover" src={img} />
              <Button
                onClick={() => navigate("/about")}
                pos="absolute"
                top="4rem"
                left="5rem"
                borderRadius="2px"
                variant="ghost"
                borderWidth="5px"
                fontFamily="bodySerif"
              >
                ABOUT US
              </Button>
            </Flex>
          );
        })}
      </Carousel>
    </Box>
  </Box>
);

const mainTitle = [
  {
    text: "MORE BRIGHT EMOTIONS",
    font: "bodySerif",
    size: "4xl",
  },
  {
    text: "IN",
    font: "handWritten",
    size: "4rem",
    transform: "translate(0,-2rem)",
  },
  {
    text: "THE",
    font: "bodySerif",
    size: "4xl",
  },
  {
    text: "NeW",
    font: "handWritten",
    size: "6xl",
    transform: "translate(0,-2rem)",
  },
  {
    text: "COLLECTION",
    font: "bodySerif",
    size: "4xl",
  },
];

const mainTitleDesktop = [
  {
    text: "MORE BRIGHT EMOTIONS",
    font: "bodySerif",
    size: "6xl",
  },
  {
    text: "IN",
    font: "handWritten",
    size: "4rem",
    transform: "translate(0,-2rem)",
  },
  {
    text: "THE",
    font: "bodySerif",
    size: "6xl",
  },
  {
    text: "NeW",
    font: "handWritten",
    size: "6xl",
    transform: "translate(0,-2rem)",
  },
  {
    text: "COLLECTION",
    font: "bodySerif",
    size: "6xl",
  },
];

const carouselImgs = [
  "/homeCandle1.jpg",
  "/homeCandle2.jpg",
  "/homeCandle3.jpg",
];

const hotProduct = [
  {
    name: "POLYAMBEROUS",
    desc: "Scent: Fruity, Floral, Woody",
    price: 200000,
    img: [
      "./sampleCandle1.webp",
      "./sampleCandle2.webp",
      "./sampleCandle3.webp",
    ],
  },
  {
    name: "POLYAMBEROUS  555",
    desc: "Scent: Fruity, Floral, Woody",
    price: 300000,
    img: [
      "./sampleCandle3.webp",
      "./sampleCandle2.webp",
      "./sampleCandle1.webp",
    ],
  },
  {
    name: "213123555",
    desc: "Scent: Fruity, Floral, Woody",
    price: 300000,
    img: [
      "./sampleCandle1.webp",
      "./sampleCandle2.webp",
      "./sampleCandle1.webp",
    ],
  },
  {
    name: "POLYAMBEROUS",
    desc: "Scent: Fruity, Floral, Woody",
    price: 200000,
    img: [
      "./sampleCandle1.webp",
      "./sampleCandle2.webp",
      "./sampleCandle3.webp",
    ],
  },
  {
    name: "POLYAMBEROUS  555",
    desc: "Scent: Fruity, Floral, Woody",
    price: 300000,
    img: [
      "./sampleCandle3.webp",
      "./sampleCandle2.webp",
      "./sampleCandle1.webp",
    ],
  },
];
