import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import Index from '../../components/cart/index';
import { useSelector } from 'react-redux';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }
  // fetch metadata
  const url = context.req.url;
  const finalURL = url.substring(1);

  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });

  const response = await fetchMetaData.json();

  //fetching cart items from server

  const fetchcartList = await fetch('http://localhost:3000/api/cart/get', {
    method: 'POST',
    body: session.user.email,
  });
  const cart = await fetchcartList.json();
  return {
    props: { cart: cart, res: response.res[0] },
  };
}

export default function Account(props) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <meta name="description" content={props?.res?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.res?.title}</title>
        <title>Cart </title>
      </Head>
      <Navbar />
      <Index cart={props.cart} />
    </>
  );
}
