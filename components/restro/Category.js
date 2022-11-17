import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import CategoryCard from "./CategoryCard";

const Category = (props) => {
  const accessToken = props.data.accessToken;
  const refreshToken = props.data.accessToken;

  const router = useRouter();
  let id = router.query.id;
  let category = "recommended";
  const [categoryName, setCategoryName] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    Recommended();
  }, []);

  const Recommended = async () => {
    try {
      let category = "Recommended";
      axiosInstance
        .get(`http://localhost:5000/api/food/?restaurantId=${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setCategoryName("recommended");
        });
    } catch (e) {
      if (e.response.status === 401) {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      } else {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      }
    }
  };

  const onClickHandler = async (item) => {
    try {
      let category = item.name;
      await axiosInstance
        .get(
          `http://localhost:5000/api/food/?restaurantId=${id}&categoryId=${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((res) => {
          setData(res.data.data);
          setCategoryName(category);
        });
    } catch (e) {
      if (e.response.status === 401) {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      } else {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated User!");
        router.push("/");
      }
    }
  };

  return (
    <Container sx={{ my: "50px" }}>
      <Typography variant="h4">Order Online</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          mt: "30px",
          flexDirection: { md: "row", xs: "column" },
          flex: 3,
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "block" },
            overflowX: "scroll",
            flex: 1 / 2,
            textAlign: { md: "left", xs: "center" },
          }}
        >
          <Typography
            onClick={() => Recommended()}
            sx={{
              cursor: "pointer",
              p: "10px",
              flex: 4,
              color: "recommended" == categoryName ? "white" : "black",
              backgroundColor: "recommended" == categoryName ? "#FFC300" : "",
            }}
          >
            RECOMMENDED
          </Typography>
          {props.data.restaurant.data.category.map((item) => {
            return (
              <>
                <Typography
                  onClick={() => onClickHandler(item)}
                  sx={{
                    cursor: "pointer",
                    color: item.name == categoryName ? "white" : "black",
                    backgroundColor: item.name == categoryName ? "#FFC300" : "",
                    p: "10px",
                    flex: 4,
                  }}
                  key={item.id}
                >
                  {item.name.toUpperCase()}
                </Typography>
              </>
            );
          })}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {data?.map((item) => {
            return (
              <>
                <CategoryCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  des={item.description}
                  price={item.price}
                  img={item.img}
                  time="15"
                />
              </>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Category;
