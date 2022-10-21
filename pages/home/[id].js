import { Box, Container, DialogContentText } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Search from '../../components/home/Search';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  //fetch metadata
  const finalURL = 'orderdetail';
  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });
  const response = await fetchMetaData.json();

  //get search data
  const id = context.query.id;
  console.log('CONTEXT====>>>>>', id);
  const getSearchData = await fetch('http://localhost:3000/api/search', {
    method: 'POST',
    body: await id,
  });
  const searchResponse = await getSearchData.json();

  return {
    props: { res: response.res[0], search: searchResponse },
  };
}

const detail = (props) => {
  return (
    <div>
      <Head>
        <meta name="description" content={props?.res?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.res?.title}</title>
      </Head>
      <Navbar />
      <Search search={props.search} />
    </div>
  );
};

export default detail;
