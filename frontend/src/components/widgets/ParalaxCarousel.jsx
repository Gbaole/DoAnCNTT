import { Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Parallax } from "react-scroll-parallax";

function ParalaxCarousel({ carouselImgs, speed }) {
  return (
    <Parallax speed={speed}>
      <Carousel zIndex="2" showThumbs={false}>
        {carouselImgs.map((img, id) => {
          return <Image key={id} maxH="50vh" objectFit="cover" src={img} />;
        })}
      </Carousel>
    </Parallax>
  );
}

export default ParalaxCarousel;
