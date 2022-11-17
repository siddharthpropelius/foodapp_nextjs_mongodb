import { Box, Container } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Head from "next/head";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/axiosInstance";
import { useRouter } from "next/router";
import Detail from "../../components/order/detail";

export async function getServerSideProps(context) {
  const fetchMetaData = await fetch(
    "http://localhost:5000/api/meta/by-id?metaId=8",
    {
      method: "GET",
    }
  );
  const response = await fetchMetaData.json();
  return {
    props: { meta: response.data },
  };
}

const detail = (props) => {
  return (
    <>
      <Detail meta={props.meta} />
    </>
  );
};

export default detail;
