import React from "react";
import Carousel, {
  autoplayPlugin,
  slidesToShowPlugin,
  slidesToScrollPlugin,
} from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import monet from "../../static/monet.jpg";
import afremov from "../../static/afremov.jpeg";
import munch from "../../static/munch.jpg";
import vangogh from "../../static/vangogh.jpg";

function CarouselShowcase() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "row",
        alignContent: "center",
        textAlign: "center",
        height: "500px",
      }}
    >
      <Carousel
        plugins={[
          "centered",
          "infinite",
          "arrows",
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2,
            },
          },
          {
            resolve: slidesToScrollPlugin,
            options: {
              numberOfSlides: 2,
            },
          },
          {
            resolve: autoplayPlugin,
            options: {
              interval: 1000,
            },
          },
        ]}
        animationSpeed={250}
      >
        <img style={{ height: "500px" }} src={afremov} alt="Leonid Afremov" />
        <img style={{ height: "500px" }} src={monet} alt="Claude Monet" />
        <img style={{ height: "500px" }} src={munch} alt="Edvard Munch" />
        <img
          style={{ height: "500px" }}
          src={vangogh}
          alt="Vincent Van Gough"
        />
      </Carousel>
    </div>
  );
}

export default CarouselShowcase;
