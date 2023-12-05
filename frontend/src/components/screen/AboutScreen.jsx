import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Logo from "../widgets/Logo";

const AboutScreen = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      {isDesktop ? (
        <Box w="100%" minH="100vh">
          <Container maxW="container.xl" minH="100vh">
            <Box w="100%" py="1rem">
              <Center py="2rem">
                <Heading>ABOUT US</Heading>
              </Center>
              <Flex justify="center">
                <Image src="/homeCandle2.jpg" h="60vh"></Image>
              </Flex>
              <Flex w="100%" my="2rem">
                <Stack px="10rem" spacing={5}>
                  <Center w="100%" mt="2rem">
                    <Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores nihil debitis voluptates natus eos labore
                      excepturi commodi, odit quisquam, dicta adipisci possimus
                      consequuntur modi? Ab tempore voluptas quos recusandae
                      dolorum!
                    </Text>
                  </Center>
                </Stack>
              </Flex>
            </Box>
          </Container>
        </Box>
      ) : (
        <Container maxW="container.xl" minH="100vh">
          <Box transform="translate(0,-1.2rem)">
            <Carousel zIndex="2" showThumbs={false}>
              {carouselImgs.map((img, id) => {
                return (
                  <Image
                    borderRadius="1em"
                    key={id}
                    maxH="28vh"
                    objectFit="cover"
                    src={img}
                  />
                );
              })}
            </Carousel>
          </Box>
          <VStack mb="1em">
            <Heading m="0em" fontFamily="bodySerif" size="md">
              ABOUT OUR BRAND
            </Heading>
            <Box>
              <Logo
                fill={colorMode == "light" ? "primary.100" : "white"}
                h="4rem"
              />
            </Box>
          </VStack>
          <Divider
            borderWidth="2px"
            borderColor={
              colorMode == "light" ? "primary.200" : "primaryDark.200"
            }
          />
          <Text my="1em" mx="3em">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            magni accusamus illum repellendus deleniti neque fugit quis
            repellat, quasi dolor inventore error hic. Nesciunt sunt asperiores
            reprehenderit, consequuntur debitis doloribus.
          </Text>
          <Divider
            borderWidth="2px"
            borderColor={
              colorMode == "light" ? "primary.200" : "primaryDark.200"
            }
          />
          <Text my="1em" mx="3em">
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            magni accusamus illum repellendus deleniti neque fugit quis
            repellat, quasi dolor inventore error hic. Nesciunt sunt asperiores
            reprehenderit, consequuntur debitis doloribus.
          </Text>
        </Container>
      )}
    </Box>
  );
};

export default AboutScreen;

const carouselImgs = ["/homeCandle1.jpg", "/collection1.jpg"];
