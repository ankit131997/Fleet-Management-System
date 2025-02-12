import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import Imgslide from "../../asset/Imgslide.jpg"; // Make sure this is the 



import bridge from "../../asset/bridge-6314795_1280.jpg";
import venatge from "../../asset/vw-1835506_1280.jpg"
import travell from "../../asset/max-di-capua-S1O5ntrjkgc-unsplash.jpg"

// correct path to the image

export const HeroSection = () => {
  // Slick Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // Disable arrows for background
  };

  return (
    <Box sx={{ position: "relative", height: "50vh" }}>
      <Slider {...settings}>
        <div>
          <Box
            sx={{
              backgroundImage: `url(${bridge})`, // Correctly format the image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh",
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              backgroundImage: `url(${venatge})`, // Correctly format the image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh",
            }}
          />
        </div>
        <div>
          <Box
            sx={{
              backgroundImage: `url(${travell})`, // Correctly format the image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh",
            }}
          />
        </div>
      </Slider>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          zIndex: 1,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Your Journey, Your Way!
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
        Find the best rental deals, hit the road, and explore with ease!
        </Typography>
       
      </Box>
    </Box>
  );
};
