import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/restro/hero';
import Name from '../../components/restro/Name';
import Menu from '../../components/restro/Menu';
import Category from '../../components/restro/Category';
import Head from 'next/head';
import axiosInstance from '../../utils/axiosInstance';

export async function getServerSideProps(context) {
  const restaurantId = context.query.id;
  const cookie = context.req.cookies;

  // meta data
  const fetchMetaData = await fetch(
    'http://localhost:5000/api/meta/by-id?metaId=3',
    {
      method: 'GET',
    }
  );
  const response = await fetchMetaData.json();

  const getResturant = await axiosInstance.get(
    `http://localhost:5000/api/restaurant/by-restaurantId/?restaurantId=${restaurantId}`,
    {
      headers: {
        Authorization: `Bearer ${cookie.accessToken}`,
        refreshToken: `Bearer ${cookie.refreshToken}`,
      },
    }
  );
  const restaurantResult = await getResturant;

  return {
    props: { meta: response.data, restaurant: restaurantResult.data },
  };
}

const DetailPage = (props) => {
  console.log(props);
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
      <Hero />
      <Name restaurant={props} />
      <Menu />
      <Category data={props} />
    </div>
  );
};

export default DetailPage;
