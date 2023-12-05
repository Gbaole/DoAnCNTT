import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MAIN_URL } from "../../API/KalaURL";
import "react-quill/dist/quill.snow.css";
import { ViewIcon } from "@chakra-ui/icons";
import { IoHeadsetOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { commentNew, likeNew } from "../../API/News";

const NewsDetail = () => {
  let { id } = useParams();
  const [news, setNews] = useState({
    heading: "",
    coverImage: [],
    caption: "",
    content: "",
  });
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const like = () => {
    likeNew(id)
      .then((res) => {
        setLiked(true);
        setNews(res.data.news);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const commentSubmit = () => {
    commentNew(id, name, comment)
      .then((res) => {
        setNews(res.data.news);
        setComment("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const newsFetch = async () => {
      fetch(`${MAIN_URL}/news/find/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.news);
        });
    };
    newsFetch();
  }, []);

  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      <Container maxW="container.md" minH="100vh">
        <Box w="100%" py="1rem">
          <Flex justify="center">
            {news.coverImage.length > 0 && (
              <Image src={news.coverImage[0].url} h="60vh"></Image>
            )}
          </Flex>
          <Flex w="100%" my="2rem" flexDir={"column"}>
            <Heading>{news.heading}</Heading>
            <Flex align={"center"} justify={"end"} w={"100%"}>
              <ViewIcon boxSize={"1.5rem"} />
              <Text ml={"0.5rem"} mr={"1rem"}>
                {news.view}
              </Text>
              <IconButton
                variant={"outline"}
                aria-label="Search database"
                onClick={like}
                icon={
                  liked ? (
                    <IoHeart size={"1.5rem"} />
                  ) : (
                    <IoHeartOutline size={"1.5rem"} />
                  )
                }
                isDisabled={liked}
              />

              <Text ml={"0.5rem"}>{news.like}</Text>
            </Flex>
            <Text fontWeight={"bold"} fontSize={"xl"}>
              {news.caption}
            </Text>
            <Box
              className="ql-snow"
              style={{ width: "100%", marginTop: "2rem" }}
              dangerouslySetInnerHTML={{ __html: news.content }}
              textStyle="p"
            ></Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsDetail;
