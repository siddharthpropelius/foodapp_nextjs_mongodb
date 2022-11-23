import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
import slice, { sliceAction } from "../../redux/slice/slice";
import axiosInstance from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const Index = () => {
  const cart = useSelector((state) => state.slice.food);
  const total = useSelector((state) => state.slice.total);
  const newTotal = useSelector((state) => state.slice.newTotal);
  const discount = useSelector((state) => state.slice.discount);
  const haveCoupon = useSelector((state) => state.slice.couponName);

  const [response, setResponse] = useState("");
  const [qty, setQty] = useState(0);
  const [coupon, setCoupon] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleOrderBtn = async () => {
    try {
      await axiosInstance.post(
        "http://localhost:5000/api/orders",
        { items: cart, discount: discount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          },
        }
      );
      setResponse("Order Placed SuccessFully");
      setTimeout(() => {
        setResponse("");
        router.push("/order");
        setTimeout(() => {
          dispatch(sliceAction.reset());
        }, 1000);
      }, 1000);
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
  };

  const couponHandler = () => {
    dispatch(sliceAction.addCoupon(coupon));
    setIsCouponApplied(true);
  };

  const removeCoupon = () => {
    console.log("clicked");
    dispatch(sliceAction.removeCoupon(discount));
    setIsCouponApplied(false);
  };
  return (
    <div>
      <Container>
        <Typography variant="h5" sx={{ mt: "50px" }}>
          Your Cart
        </Typography>
      </Container>
      {cart.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: "100px" }}>
          <Typography
            sx={{
              fontSize: {
                md: "28px",
                sm: "22px",
                xs: "20px",
              },
              color: "#937000",
            }}
          >
            Nothing in Cart. Add Something
          </Typography>
        </Box>
      ) : (
        <>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { md: "row", xs: "column" },
                marginTop: 5,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: 2 }}>
                {cart?.map((item) => {
                  return (
                    <div key={item.id}>
                      <CartCard
                        id={item.foodId}
                        item={item.item}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        img={item.img}
                        des={item.des}
                        total={item.total}
                      />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </Container>

          <Box sx={{ mt: "20px" }}>
            <div className="w-full flex justify-center pl-5">
              <div className="border px-12 py-6 rounded">
                <h1 className="text-2xl text-[#937000] pb-4"> ORDER SUMMARY</h1>
                <hr />
                <div className="flex justify-between mt-4">
                  <p className="font-bold text-xl">Sub Total :</p>
                  <p className="font-bold text-xl">₹{total}</p>
                </div>
                <div className="flex justify-between mt-4">
                  {isCouponApplied ? (
                    <>
                      <Typography sx={{ color: "green" }}>
                        <spans
                          className={
                            "flex justify-between text-black font-bold text-xl pb-2"
                          }
                        >
                          <p>Discount:</p>
                          <p>₹{discount}</p>
                        </spans>
                        COUPON APPLIED: {haveCoupon.toUpperCase()}{" "}
                        <span
                          className="text-red-900 cursor-pointer"
                          onClick={removeCoupon}
                        >
                          REMOVE
                        </span>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TextField
                        onChange={(e) => setCoupon(e.target.value)}
                        id="outlined-basic"
                        label="have a coupon apply here"
                        variant="outlined"
                        required
                        value={coupon.toUpperCase()}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          marginX: "4px",
                          marginTop: "0px",
                          color: "#FFFFFF",
                          backgroundColor: "#937000",
                          "&:hover": {
                            backgroundColor: "#937000",
                          },
                        }}
                        onClick={() => couponHandler()}
                      >
                        Apply
                      </Button>
                    </>
                  )}
                </div>

                <br />
                <hr />
                <div className="flex justify-between pb-4">
                  <p className="font-bold text-xl">Total :</p>
                  <p className="font-bold text-xl">₹{newTotal}</p>
                </div>
                <hr />
              </div>
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: "30px",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#937000",
                color: "#FFFFFF",
                width: "40%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                borderRadius: "10px",
                paddingY: "10px",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={handleOrderBtn}
            >
              Order Now
            </Typography>
          </Box>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",

              pb: "50px",
              color: "green",
            }}
          >
            {response}
          </Typography>
        </>
      )}
    </div>
  );
};

export default Index;
