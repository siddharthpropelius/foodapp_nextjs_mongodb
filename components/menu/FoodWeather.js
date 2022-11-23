import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/future/image";
import React, { useState, useEffect } from "react";
import FoodWeatherCard from "./FoodWeatherCard";

const FoodWeather = (props) => {
  console.log(props);
  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ mt: "50px" }}>
          Food According to Weather
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: { md: "63px", xs: "20px" },
            mt: "30px",
          }}
        >
          {props.data.food.map((item) => {
            return (
              <div key={item.id}>
                <FoodWeatherCard
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  price={item.price}
                  img={item.img}
                  time={item.time}
                  des={item.description}
                  // quantity={item.quantity}
                />
              </div>
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "unset",
            display: "flex",
            gap: "10px",
            mt: "50px",
            mb: "40px",
            mx: "auto",
            alignItems: "center",
            overflowX: "scroll",
            overflowY: "hidden",
          }}
        >
          {props.data.imgData.map((item) => {
            return (
              <div key={item.id} className="mx-auto">
                <Box
                  key={item.id}
                  sx={{
                    width: "350px",
                    height: "400px",
                    maxWidth: "unset",
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.primary}
                    width={350}
                    // className="w-[350px]"
                    style={{ maxWidth: "unset" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "16px",
                      zIndex: "4",
                      mt: {
                        xs: "-50px",
                        sm: "-40px",
                        md: "-50px",
                        lg: "-65px",
                      },
                      pl: "10px",
                      color: "white",
                    }}
                  >
                    {item.primary.toUpperCase()}
                  </Typography>
                </Box>
              </div>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default FoodWeather;
