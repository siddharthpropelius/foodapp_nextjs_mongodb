import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import v1 from "../../assets/v2.png";
import v2 from "../../assets/v1.png";
import Image from "next/future/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sliceAction } from "../../redux/slice/slice";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Rounded from "../../assets/roundbottom.png";

const PopularRecipes = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [response, setResponse] = useState({ res: "", success: "" });
  const cart = useSelector((state) => state.slice.food);
  const accessToken = props.accessToken;
  const refreshToken = props.refreshToken;
  const router = useRouter();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        setCategory("pizza");
        await axios
          .get("http://localhost:5000/api/food/?categoryId=1", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          })
          .then((res) => {
            setRecipes(res.data.data);
          });
      } catch (err) {
        if (err.response.status === 401) {
          Cookies.remove("accessToken", { path: "" });
          Cookies.remove("refreshToken", { path: "" });
          alert("Unauthenticated user!");
          router.push("/");
        } else {
          Cookies.remove("accessToken", { path: "" });
          Cookies.remove("refreshToken", { path: "" });
          alert("Unauthenticated user!");
          router.push("/");
        }
      }
    }
    fetchData();
  }, []);

  const handleOnClick = async (item) => {
    try {
      let val = item.name;
      setCategory(val);
      setRecipes([]);
      await axiosInstance
        .get(`http://localhost:5000/api/food/?categoryId=${item.id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          setRecipes(res.data.data);
        });
    } catch (err) {
      if (err.response.status === 401) {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated user!");
        router.push("/");
      } else {
        Cookies.remove("accessToken", { path: "" });
        Cookies.remove("refreshToken", { path: "" });
        alert("Unauthenticated user");
        router.push("/");
      }
    }
  };

  const handleOnAdd = (props) => {
    const find = cart.find((item) => item.id === props.id);
    if (find?.quantity === 5) {
      setResponse({ error: "Cannot add more than 5 quantity" });
      setTimeout(() => {
        setResponse({ success: "", error: "" });
      }, 1000);
    } else {
      setResponse({ success: "Item added to cart" });
      setTimeout(() => {
        setResponse({ success: "", error: "" });
      }, 1000);
    }
    dispatch(
      sliceAction.addToCart({
        foodId: props.id,
        name: props.name,
        img: props.img,
        price: props.price,
      })
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ display: { md: "block", xs: "none" } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Image
            src={v1}
            alt="vector"
            style={{ left: 0, position: "absolute" }}
          />
          <Image
            src={v2}
            alt="vector"
            style={{ right: 0, position: "absolute" }}
          />
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "center",
          mt: "150px",
        }}
      >
        Popular Recipes
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: { md: "center", xs: "space-between" },
          gap: "5px",
          marginTop: "30px",
          px: "8px",
          overflowX: "scroll",
        }}
      >
        {props?.category?.data?.map((item) => {
          return (
            <div key={item.id * Math.random()}>
              <Button
                key={item.id}
                sx={{
                  maxWidth: "unset",
                  width: "200px",

                  color: item.name === category ? "white" : "black",
                  backgroundColor:
                    item.name === category ? "#F6B716 !important" : "",
                  borderRadius: "45px",
                  px: "40px",
                  "&:hover": {
                    backgroundColor: "#F6B716",
                    color: "#fff",
                  },
                }}
                onClick={() => handleOnClick(item)}
              >
                {item.name}
              </Button>
            </div>
          );
        })}
      </Box>
      <Typography sx={{ color: "green", pl: "6px" }}>
        {response.success}
      </Typography>
      <Typography sx={{ color: "red", pl: "5px" }}>{response.error}</Typography>
      <Box sx={{ mt: "50px", px: { xs: "6px", md: "30px" } }}>
        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView={4}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
            300: {
              width: 300,
              slidesPerView: 1,
            },
          }}
        >
          {recipes?.map((item) => {
            return (
              <div key={item.id}>
                <SwiperSlide key={item.id}>
                  <>
                    <Box
                      className="ds"
                      sx={{
                        width: "100%",
                        height: "500px",
                        backgroundColor: "#FFF",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "25px",
                        border: "2px solid #ECEEF6",
                        cursor: "pointer",
                        clipPath: "40%",
                      }}
                      key={item.id}
                      onClick={() => handleOnAdd(item)}
                    >
                      <Image
                        src={item.img}
                        alt="food"
                        width={500}
                        height={400}
                        style={{
                          width: "100%",
                          height: "70%",
                          objectFit: "cover",
                          borderRadius: "25px 25px 0px 0px",
                        }}
                      />
                      <span className={"flex justify-between"}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                            px: "20px",
                            pt: "20px",
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                            px: "20px",
                            pt: "20px",
                          }}
                        >
                          32 min
                        </Typography>
                      </span>
                      <Typography sx={{ px: "20px" }}>
                        {item.description}
                      </Typography>
                      <p className={"mx-auto px-2 py-3 text-xl "}>
                        ₹{item.price}
                      </p>
                    </Box>
                    <Box>
                      <div
                        className={"flex justify-center mt-[-23px]"}
                        onClick={() => handleOnAdd(item)}
                      >
                        <Image
                          src={Rounded}
                          alt={"svg"}
                          width={100}
                          height={100}
                        />
                        <div
                          className={
                            "bg-white hover:bg-[#F6B716] cursor-pointer absolute bg-white border border-1 border-[#ECEEF6] rounded-full p-1"
                          }
                        >
                          <ShoppingBagIcon />
                        </div>
                      </div>
                    </Box>
                  </>
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PopularRecipes;
