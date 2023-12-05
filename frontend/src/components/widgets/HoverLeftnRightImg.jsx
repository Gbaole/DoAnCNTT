import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";

const HoverImg = ({ imgArray = [] }) => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  return (
    <Box
      position="relative"
      display="inline-block"
      // maxW="25rem"
      // maxH="25rem"
      // minH="15rem"
      // minW="15rem"
    >
      {imgArray.length > 0 && (
        <Image
          src={imgArray[0].url}
          alt="Base Image"
          w="100%"
          // h="100%"
          h="25rem"
          // borderRadius="1em"
          objectFit="cover"
        />
      )}
      {imgArray.length > 1 && (
        <>
          {isLeftHovered && (
            <Image
              src={imgArray[1].url}
              alt="Left Image Hover"
              position="absolute"
              top="0"
              left="0"
              w="100%"
              // h="100%"
              h="25rem"
              // borderRadius="1em"
              objectFit="cover"
            />
          )}
        </>
      )}
      {imgArray.length > 2 && (
        <>
          {isRightHovered && (
            <Image
              src={imgArray[2].url}
              alt="Right Image Hover"
              position="absolute"
              top="0"
              right="0"
              w="100%"
              // h="100%"
              h="25rem"
              // borderRadius="1em"
              objectFit="cover"
            />
          )}
        </>
      )}
      <Box
        onMouseEnter={() => setIsLeftHovered(true)}
        onMouseLeave={() => setIsLeftHovered(false)}
        position="absolute"
        top="0"
        left="0"
        w="50%"
        h="100%"
      ></Box>
      <Box
        onMouseEnter={() => setIsRightHovered(true)}
        onMouseLeave={() => setIsRightHovered(false)}
        position="absolute"
        top="0"
        right="0"
        w="50%"
        h="100%"
      ></Box>
    </Box>
  );
};

export default HoverImg;
