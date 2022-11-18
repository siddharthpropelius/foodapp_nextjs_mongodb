import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sliceAction } from "../../redux/slice/slice";

const CartCard = ({ id, name, img, price, quantity }) => {
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();
  const addToCart = () => {
    if (quantity === 5) {
      setResponse("Cannot add more than 5 items");
      setTimeout(() => {
        setResponse("");
      }, 1000);
    }
    dispatch(
      sliceAction.addToCart({ foodId: id, name: name, price: price, quantity })
    );
  };

  const removeFromCart = () => {
    dispatch(sliceAction.removeFromCart(id));
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          py: 2,
          justifyContent: { md: "space-around" },
          marginX: "auto",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row-reverse" },
          }}
        >
          <Box sx={{ pl: 4 }}>
            <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
            <Box
              sx={{
                mt: 1,
                flexWrap: "nowrap",
              }}
            >
              <button
                className="px-2 bg-[#FFA500] text-white rounded mr-2"
                onClick={() => removeFromCart()}
              >
                -
              </button>
              {quantity}
              <button
                className="px-2 bg-[#FFA500] text-white rounded mx-2"
                onClick={() => addToCart()}
              >
                +
              </button>
            </Box>
            <Typography sx={{ fontSize: "12px", mt: 1, ml: 1, color: "red" }}>
              {response}
            </Typography>
          </Box>
          <Image
            src={img}
            alt={name}
            width={150}
            height={150}
            objectFit="cover"
            style={{
              borderRadius: "10px",
              position: "fixed",
              height: { md: "300px" },
            }}
          />
        </Box>

        <Box>
          <Typography>Price : ₹{price}</Typography>
        </Box>
        <Box>
          <Typography>Total : ₹{price * quantity}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CartCard;
