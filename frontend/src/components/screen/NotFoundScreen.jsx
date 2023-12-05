import { AbsoluteCenter, Box, Heading } from "@chakra-ui/react";
import React from "react";

function NotFound(props) {
  return (
    <Box w="100%" pt={"4rem"} minH="100vh">
      <AbsoluteCenter>
        <Heading fontSize="6xl">404 Not Found!</Heading>
      </AbsoluteCenter>
    </Box>
  );
}

export default NotFound;
