import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

const EGiftCard = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      {isDesktop ? (
        //Desktop UI
        <Container maxW="container.xl" minH="100vh">
          <Flex>
            <Box w="100%">
              <HStack alignItems="start">
                <Flex w="100%">
                  <Text fontSize="xl" pt="1rem" mx={6}>
                    e-gift card
                  </Text>
                  <Heading
                    fontSize="5xl"
                    w="container.md"
                    align="right"
                    zIndex="4"
                    m={6}
                    fontFamily="bodySerif"
                  >
                    SETS ARE THE PERFECT SOLUTION FOR A GIFT
                  </Heading>
                </Flex>
              </HStack>
              <HStack justify="center">
                <Flex w="75%">
                  <Text
                    fontSize="xl"
                    w="container.fluid"
                    align="left"
                    zIndex="4"
                    m={6}
                  >
                    The idea of a set of candles as a gift for any holiday is an
                    excellent and original solution for your loved ones. It will
                    warm and remind you of your love, as well as transform any
                    room and complement the comfort in it.
                  </Text>
                </Flex>
              </HStack>
              <HStack justify="center">
                <Flex w="75%">
                  <Text
                    fontSize="xl"
                    w="container.fluid"
                    align="left"
                    zIndex="4"
                    m={6}
                  >

                    If you don{`'`}t know what exactly your friend will like,
                    then pick up a gift multicard! You will definitely not lose
                    and will allow you to make a choice yourself.
                  </Text>
                </Flex>
              </HStack>
              <HStack justify="center">
                <Flex w="75%">
                  <Text mb="5em">Open sets &#8212;</Text>
                </Flex>
              </HStack>
              <Flex
                mb="5em"
                justify="center"
                boxShadow="lg"
                borderRadius="md"
                p={4}
              >
                <HStack>
                  <VStack>
                    <Image borderRadius="md" w="40em" src="/egiftcard1.jpg" />
                  </VStack>
                  <Box>
                    <VStack>
                      <Image
                        m={1}
                        borderRadius="md"
                        w="20em"
                        src="/egiftcard2.jpg"
                      />
                    </VStack>
                    <VStack>
                      <Image
                        m={1}
                        borderRadius="md"
                        w="20em"
                        src="/egiftcard1.jpg"
                      />
                    </VStack>
                  </Box>
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </Container>
      ) : (
        //Mobile UI
        <Container maxW="container.xl" minH="100vh">
          <Box alignItems="center" mt="5em">
            <HStack alignItems="start" w="100%">
              <Wrap w="100%">
                <Text fontSize="xl">e-gift card</Text>
                <Text
                  fontSize="4xl"
                  fontWeight="extrabold"
                  w="container.sm"
                  textAlign="right"
                  zIndex="4"
                >
                  SETS ARE THE PERFECT SOLUTION FOR A GIFT
                </Text>
                <Spacer />
                <Box>
                  <Text fontSize="xl" my={3}>
                    The idea of a set of candles as a gift for any holiday is an
                    excellent and original solution for your loved ones. It will
                    warm and remind you of your love, as well as transform any
                    room and complement the comfort in it.
                  </Text>
                  <Text fontSize="xl" my={3}>

                    If you don{`'`}t know what exactly your friend will like,
                    then pick up a gift multicard! You will definitely not lose
                    and will allow you to make a choice yourself.
                  </Text>
                  <Text mb="5em" fontSize="xl" my={3}>
                    Open sets &#8212;
                  </Text>
                </Box>
              </Wrap>
            </HStack>
            <Flex
              mb="5em"
              justify="center"
              boxShadow="lg"
              borderRadius="md"
              p={4}
            >
              <VStack>
                <HStack>
                  <Image borderRadius="md" w="100%" src="/egiftcard1.jpg" />
                </HStack>
                <Flex>
                  <HStack m={1}>
                    <Image
                      borderRadius="md"
                      w="50em"
                      src="/egiftcard2.jpg"
                    ></Image>
                  </HStack>
                  <HStack>
                    <Image
                      borderRadius="md"
                      w="50em"
                      src="/egiftcard1.jpg"
                    ></Image>
                  </HStack>
                </Flex>
              </VStack>
            </Flex>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default EGiftCard;
