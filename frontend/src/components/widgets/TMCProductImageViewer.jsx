import { Box, Flex, HStack, IconButton, Image } from "@chakra-ui/react";
import React from "react";
import { getCloudinaryVideoThumbnail } from "../../Utils/toolkits";
import { IoPlayCircleOutline } from "react-icons/io5";
function TMCProductImageViewer({
  images = [],
  currentImg = "",
  setCurrentImg = () => {},
  setCurrentPT = () => {},
  productTypeArray = [],
}) {
  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Box w={"100%"} pos={"relative"}>
        {images.map((img, id) => {
          if (img.mediaType.split("/")[0] == "image") {
            if (img._id === currentImg) {
              return (
                <Image
                  key={id}
                  src={img.url}
                  alt={img.name}
                  height={"34rem"}
                  w={"30rem"}
                  objectFit={"cover"}
                />
              );
            }
          } else {
            return (
              <Box
                key={img._id}
                h={"34rem"}
                display={currentImg == img._id ? "flex" : "none"}
              >
                <video
                  className="videoTag"
                  autoPlay
                  loop
                  muted
                  style={{
                    objectFit: "contain",
                    backgroundColor: "black",
                  }}
                >
                  <source src={img.url} type={img.mediaType} />
                </video>
              </Box>
            );
          }
        })}
        {productTypeArray.map((pt, id) => {
          return pt.image.map((img) => {
            if (img._id === currentImg) {
              return (
                <Image
                  key={img._id}
                  src={img.url}
                  height={"34rem"}
                  alt={img.name}
                />
              );
            }
          });
        })}
      </Box>
      <HStack
        align={"start"}
        overflow={"auto"}
        whiteSpace={"nowrap"}
        mt={4}
        p={"1rem"}
        pos={"relative"}
      >
        {images.map((img, id) => {
          let url = img.url;
          if (img.mediaType.split("/")[0] == "video") {
            url = getCloudinaryVideoThumbnail(url);
          }
          return (
            <Box
              key={id}
              pos={"relative"}
              transitionDuration={"0.25s"}
              _hover={{ transform: "scale(1.05, 1.05)" }}
            >
              {img.mediaType.split("/")[0] == "video" && (
                <IconButton
                  aria-label="Play video"
                  icon={<IoPlayCircleOutline size={52} />}
                  h={"7rem"}
                  w={"7rem"}
                  mr={4}
                  pos={"absolute"}
                  top={0}
                  left={0}
                  zIndex={5}
                  bgColor={"transparent"}
                  variant={"link"}
                  onClick={() => {
                    setCurrentPT(null);
                    setCurrentImg(img._id);
                  }}
                />
              )}
              <Image
                pos={"relative"}
                src={url}
                h={"7rem"}
                w={"7rem"}
                mr={4}
                objectFit={"cover"}
                borderWidth={"0.3rem"}
                borderColor={currentImg == img._id ? "cyan.500" : "white"}
                borderStyle={"solid"}
                p={1}
                alt={img.name}
                onClick={() => {
                  setCurrentPT(null);
                  setCurrentImg(img._id);
                }}
              />
            </Box>
          );
        })}
        {productTypeArray.map((pt, id) => {
          return pt.image.map((img) => {
            return (
              <Box
                key={id}
                pos={"relative"}
                transitionDuration={"0.25s"}
                _hover={{ transform: "scale(1.05, 1.05)" }}
              >
                <Image
                  pos={"relative"}
                  src={img.url}
                  alt={img.name}
                  h={"7rem"}
                  w={"7rem"}
                  mr={4}
                  objectFit={"cover"}
                  borderWidth={"0.3rem"}
                  borderColor={currentImg == img._id ? "cyan.500" : "white"}
                  borderStyle={"solid"}
                  p={1}
                  onClick={() => {
                    setCurrentPT(null);
                    setCurrentImg(img._id);
                  }}
                />
              </Box>
            );
          });
        })}
      </HStack>
    </Flex>
  );
}

export default TMCProductImageViewer;
