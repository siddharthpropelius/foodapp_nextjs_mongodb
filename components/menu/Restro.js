import { Box, Container, Typography } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import Image from "next/future/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Restro = (props) => {
  const router = useRouter();

  const handleClick = (item) => {
    router.push(`/restro/${item.id}`);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mt: "40px" }}>
          Top brands for you
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            overflowX: "auto",
            gap: "20px",
            mt: "30px",
            px: 0,
          }}
        >
          {props.data.restaurant.data?.map((item) => {
            return (
              <div key={item.id}>
                <Box sx={{ maxWidth: "unset", width: "100px" }}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={120}
                    height={120}
                    overflow="scroll"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(item)}
                  />
                </Box>
              </div>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Restro;
