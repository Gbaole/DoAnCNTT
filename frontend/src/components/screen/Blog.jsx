import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Wrap,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MAIN_URL } from "../../API/KalaURL";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const News = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsFetch = async () => {
      fetch(`${MAIN_URL}/news/allNews?skip=0&limit=10`)
        .then((response) => response.json())
        .then((data) => setNews(data.feedbackObject.records));
    };
    newsFetch();
  }, []);

  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      {isDesktop ? (
        //Desktop UI
        <Container maxW="container.xl" minH="100vh" justifyContent={"center"}>
          <Center>
            <Heading
              my="0.8em"
              fontFamily="bodySerif"
              size="2xl"
              fontWeight={"light"}
            >
              NEW BLOGS
            </Heading>
          </Center>
          <Flex mb="2rem" justify={"center"}>
            <Stack spacing={4} mb="2rem">
              {news.map((newsItem, id) => {
                return (
                  <a href={`/news/find/${newsItem._id}`} key={id}>
                    <Card
                      direction={{ base: "column", sm: "row" }}
                      overflow="hidden"
                      variant="outline"
                      _hover={{
                        transform: "scale(1.05)",
                        transition: "0.2s",
                        transitionTimingFunction: "ease-in-out",
                      }}
                    >
                      {newsItem.coverImage.length > 0 && (
                        <Image
                          objectFit="cover"
                          // maxW={{ base: "100%", sm: "15%" }}
                          w={"12rem"}
                          h={"12rem"}
                          src={newsItem.coverImage[0].url}
                          alt={newsItem.heading}
                        />
                      )}
                      <Stack>
                        <CardBody>
                          <Heading size="md" py="1rem">
                            {newsItem.heading}
                          </Heading>

                          <Text noOfLines={2}>{newsItem.caption}</Text>
                        </CardBody>
                      </Stack>
                    </Card>
                  </a>
                );
              })}
            </Stack>
          </Flex>
        </Container>
      ) : (
        //Mobile UI
        <Container maxW="container.xl" minH="100vh">
          <Box alignItems="center" mt="1em">
            <Heading
              my="0.8em"
              fontFamily="bodySerif"
              size="2xl"
              fontWeight={"light"}
            >
              Blogs
            </Heading>
            <Flex mb="2rem">
              <Wrap mx={isDesktop ? "3rem" : undefined} justify="center">
                {news.map((newsItem, id) => {
                  return (
                    <a href={`/news/find/${newsItem._id}`} key={id}>
                      <Card
                        key={id}
                        mx={"0.5rem"}
                        my={"1rem"}
                        borderRadius="0.5rem"
                        shadow="lg"
                        variant="outline"
                      >
                        <CardHeader>
                          {newsItem.coverImage.length > 0 && (
                            <Image
                              objectFit="cover"
                              src={newsItem.coverImage[0].url}
                              borderRadius="0.5rem"
                              h={"18rem"}
                              w={"100%"}
                              alt={newsItem.heading}
                            />
                          )}
                        </CardHeader>
                        <Heading size="sm" noOfLines={1} mx="2rem">
                          {newsItem.heading}
                        </Heading>
                        <CardBody>
                          <Text noOfLines={4} fontWeight={600}>
                            {newsItem.caption}
                          </Text>
                        </CardBody>
                      </Card>
                    </a>
                  );
                })}
              </Wrap>
            </Flex>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default News;
