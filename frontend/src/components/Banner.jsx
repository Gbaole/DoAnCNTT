// import { Box, useBreakpointValue, Container, Image } from "@chakra-ui/react";

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // import required modules
// import { Navigation, Pagination } from "swiper/modules";

// function Banner({ images }) {
//   const isDesktop = useBreakpointValue({ base: false, md: true });
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

//   return (
//     <>
//       <Box>
//         {isDesktop ? (
//           <DesktopLayout images={images} />
//         ) : (
//           <MobileLayout images={images} />
//         )}
//       </Box>
//     </>
//   );
// }

// export default Banner;

// const DesktopLayout = ({ images }) => (
//     <Swiper
//       slidesPerView={1}
//       navigation
//       loop
//       autoplay
//       style={{ width: "100%", height: "auto" }}>
//       {images.map((image, index) => (
//         <SwiperSlide key={index}>
//           <img src={image} alt={`Banner ${index + 1}`} />
//         </SwiperSlide>
//       ))}
//     </Swiper>

// );

// const MobileLayout = ({ images }) => <Box />;

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Spacer,
  HStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";

import { Pagination, Autoplay, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";

function Banner() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <>
      <Box w="100%" minH="100vh" mx={0}>
        {isDesktop ? (
          <DesktopLayout
            images={images}
            setCurrentSlideIndex={setCurrentSlideIndex} // Pass the function as a prop
          />
        ) : (
          <MobileLayout />
        )}
      </Box>
    </>
  );
}
export default Banner;

const DesktopLayout = ({ images, setCurrentSlideIndex }) => (
  <Container width="100%" px={0}>
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}>
      {images.map((image) => (
        <SwiperSlide key={image._id}>
          <Image objectFit="cover" src={image.src} alt="banner" />
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
