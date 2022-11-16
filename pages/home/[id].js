import { Box, Container, DialogContentText } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Head from 'next/head';
import Search from '../../components/home/Search';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';

export async function getServerSideProps(context) {
  const cookie = context.req.cookies;
  const id = context.query.id;
  const getSearchData = await axiosInstance.get(
    `http://localhost:5000/api/food/search?searchTerm=${id}`,
    {
      headers: {
        Authorization: `Bearer ${cookie.accessToken}`,
        refreshToken: `Bearer ${cookie.refreshToken}`,
      },
    }
  );
  const searchResponse = await getSearchData;

  const getMetaData = await axios.get(
    'http://localhost:5000/api/meta/by-id?metaId=7'
  );
  const meta = await getMetaData;

  return {
    props: { result: searchResponse.data, meta: meta.data },
  };
}

const detail = (props) => {
  console.log(props.meta.data.name);
  return (
    <div>
      <Head>
        <meta name="description" content={props?.meta?.data?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.meta?.data?.keywords} />
        <meta name="author" content={props?.meta?.data?.author} />
        <title>{props?.meta?.data?.name}</title>
      </Head>
      <Navbar />
      <Search search={props.result.data} />
    </div>
  );
};

export default detail;
