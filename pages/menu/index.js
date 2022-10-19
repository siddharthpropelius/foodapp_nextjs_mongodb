import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import FoodWeather from '../../components/menu/FoodWeather';
import Restro from '../../components/menu/Restro';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  //auth
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  //get metadata from server
  const url = context.req.url;
  const finalURL = url.substring(1);
  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });
  const response = await fetchMetaData.json();

  //getting list of restaurants from database

  const res = await fetch('http://localhost:3000/api/restro/getrestro');
  const result = await res.json();

  return {
    props: { response, res: result.res },
  };
}

export default function Index(props) {
  return (
    <div>
      <Head>
        <meta name="description" content={props?.response?.res[0]?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.response?.res[0]?.title}</title>
        <title>Menu</title>
      </Head>
      <Navbar />
      <Restro data={props.res} />
      <FoodWeather />
    </div>
  );
}
