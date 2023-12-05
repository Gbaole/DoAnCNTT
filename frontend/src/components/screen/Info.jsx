import { Container, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePage } from "../../API/Pages";
import "../../quill.css";

function Info() {
  const { routeName } = useParams();
  const [page, setPage] = useState({
    name: "",
    routeName: "",
    cover: [],
    title: "",
    content: "",
  });
  useEffect(() => {
    getSinglePage(routeName)
      .then(({ data }) => {
        setPage(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [routeName]);
  return (
    <div style={{ paddingTop: "4rem" }}>
      {page.cover.length !== 0 && (
        <Image
          src={page.cover[0].url}
          h={"40rem"}
          w={"100%"}
          objectFit={"cover"}
          alt={`Kala Candela - ${page.title}`}
        ></Image>
      )}
      <Container maxW={"container.lg"} pt={"2rem"} pb={"4rem"} minH={"80vh"}>
        <Heading>{page.title}</Heading>
        <Flex
          flexDir={"column"}
          mt={4}
          w={"100%"}
          className="quill-snow"
          textStyle={"p"}
          dangerouslySetInnerHTML={{ __html: page.content }}
        ></Flex>
      </Container>
    </div>
  );
}

export default Info;
