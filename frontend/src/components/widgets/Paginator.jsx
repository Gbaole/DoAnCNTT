import { Button, Container, Flex } from "@chakra-ui/react";
import React from "react";

function Paginator({ count, skip, limit, setSkip }) {
  let btnList = [];
  for (let i = 0; i < parseInt(count) / parseInt(limit); i++) {
    btnList.push(
      <Button
        key={i}
        mr={10}
        bgColor={
          parseInt(skip) / parseInt(limit) == i ? "primaryDark.200" : null
        }
        onClick={() => {
          setSkip(i * parseInt(limit));
        }}
      >
        {i + 1}
      </Button>
    );
  }
  return (
    <Flex w={"100%"} justify={"space-between"} mt={4}>
      <Button
        onClick={() => {
          if (parseInt(skip) - parseInt(limit) < 0) {
            setSkip(0);
          } else {
            setSkip(parseInt(skip) - parseInt(limit));
          }
        }}
        isDisabled={parseInt(skip) == 0}
      >
        Trang trước
      </Button>
      <Flex>{btnList}</Flex>
      <Button
        onClick={() => {
          setSkip(parseInt(skip) + parseInt(limit));
        }}
        isDisabled={parseInt(skip) + parseInt(limit) >= parseInt(count)}
      >
        Trang kế
      </Button>
    </Flex>
  );
}

export default Paginator;
