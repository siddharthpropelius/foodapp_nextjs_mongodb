import { Box, Container } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Head from "next/head";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";

const Detail = (props) => {
  const { query, router } = useRouter();
  const orderId = query.id;
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const [data, setData] = useState({});
  useEffect(() => {
    async function getOrder() {
      try {
        await axiosInstance
          .get(`http://localhost:5000/api/orders?orderId=${orderId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          })
          .then((res) => {
            setData(res.data);
            console.log(res.data);
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
          alert("Something went wrong ! Please login again");
          router.push("/");
        }
      }
    }
    getOrder();
  }, []);

  return (
    <div>
      <Head>
        <meta name="description" content={props?.meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.meta?.keywords} />
        <meta name="author" content={props?.meta?.author} />
        <title>{props?.meta?.name}</title>
      </Head>
      <Navbar />
      <Container>
        <div className="flex  justify-center ">
          {data?.data?.map((item) => {
            return (
              <div key={item.id} className="">
                {item.items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="w-full flex justify-between gap-16 py-1"
                    >
                      <Image
                        src={item.fooditems.img}
                        alt={item.fooditems.name}
                        width={100}
                        height={100}
                        objectFit="cover"
                        className="rounded-ful"
                      />
                      <p>{item.fooditems.name}</p>
                      <p>X{item.quantity}</p>
                    </div>
                  );
                })}
                <div className="flex justify-between">
                  <p>Discount</p>
                  <p>₹{(item.subtotal * item.discount) / 100}</p>
                </div>
                <div className="flex justify-between">
                  <p>SubTotal</p>
                  <p>₹{item.subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>₹{item.total}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Detail;
