import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";
import { sliceAction } from "../../redux/slice/slice";
import { useDispatch, useSelector } from "react-redux";

const FoodWeatherCard = ({ id, name, img, price }) => {
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.slice.food);

  const handleOnClick = () => {
    const find = cart.find((item) => item.id === id);
    if (find?.quantity === 5) {
      setResponse({ error: "Cannot add more than 5 quantity" });
      setTimeout(() => {
        setResponse({});
      }, 1000);
    } else {
      setResponse({ success: "Item added to cart" });
      setTimeout(() => {
        setResponse("");
      }, 1000);
    }
    dispatch(
      sliceAction.addToCart({ foodId: id, name: name, img: img, price: price })
    );
  };
  return (
    <>
      <Box
        onClick={() => handleOnClick({ id, name, img, price })}
        sx={{
          width: {
            xs: "200px",
            sm: "200px",
            md: "250px",
            lg: "300px",
          },
          cursor: "pointer",
        }}
      >
        <Image
          src={img}
          alt={name}
          width={500}
          height={400}
          objectFit="cover"
          style={{
            borderRadius: "20px 20px 0px 0px",
          }}
        />
        <Typography variant="h6" sx={{ pt: "8px" }}>
          {name}
        </Typography>
        <Typography variant="p" sx={{ color: "#757575", pb: "8px" }}>
          15 Min
        </Typography>

        <Typography sx={{ mt: 1, ml: 1, color: "red" }}>
          {response.error}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1, color: "green" }}>
          {response.success}
        </Typography>
      </Box>
    </>
  );
};

export default FoodWeatherCard;
