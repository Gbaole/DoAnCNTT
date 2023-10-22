import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Spacer,
  HStack,
  Image,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";

function Banner() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex mx={0}>
      {isDesktop ? (
        <DesktopLayout
          images={images}
          setCurrentSlideIndex={setCurrentSlideIndex}
        />
      ) : (
        <MobileLayout />
      )}
    </Flex>
  );
}
export default Banner;

const DesktopLayout = ({ images, setCurrentSlideIndex }) => (
  <Container w="100vw">
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image) => (
        <SwiperSlide key={image._id}>
          <Image objectFit="cover" width="100%" src={image.src} alt="banner" />
        </SwiperSlide>
      ))}
    </Swiper>
  </Container>
);

const MobileLayout = () => <Box />;

const images = [
  {
    _id: "1",
    name: "Lorem 1",
    short: "Lorem ipsum",
    price: "$1499",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veniam perspiciatis quas? Delectus alias quisquam, commodi exercitationem consequuntur officia. Explicabo veniam, necessitatibus animi ipsam iste aperiam. Laboriosam minus ut ipsam?",
    src: "/banner1.svg",
  },
  {
    _id: "2",
    name: "Lorem 2",
    short: "Lorem ipsum",
    price: "$1499",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut veniam perspiciatis quas? Delectus alias quisquam, commodi exercitationem consequuntur officia. Explicabo veniam, necessitatibus animi ipsam iste aperiam. Laboriosam minus ut ipsam?",
    src: "/banner2.svg",
  },
];
