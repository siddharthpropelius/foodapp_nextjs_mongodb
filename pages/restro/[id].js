import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/restro/hero';
import Name from '../../components/restro/Name';
import Menu from '../../components/restro/Menu';
import Category from '../../components/restro/Category';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  //auth
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  // fetching name of restro
  const Rid = context.params;
  const nameAPI = await fetch(
    `http://localhost:3000/api/restro/getrestrobyid/`,
    {
      method: 'POST',
      body: Rid.id,
    }
  );
  const nameResponse = await nameAPI.json();

  // meta data
  const finalURL = 'detail';
  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });
  const response = await fetchMetaData.json();

  return {
    props: { name: nameResponse, response },
  };
}

const DetailPage = (props) => {
  return (
    <div>
      <Head>
        <meta name="description" content={props?.response?.res[0]?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.response?.res[0]?.title}</title>
        <title>DetailPage</title>
      </Head>
      <Navbar />
      <Hero />
      <Name data={props.name.res} />
      <Menu />
      <Category data={props.name.res} />
    </div>
  );
};

export default DetailPage;
