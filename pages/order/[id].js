import { Box, Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  let id = context.query.id;
  const fetchOrderDetails = await fetch(
    'http://localhost:3000/api/order/details',
    { method: 'POST', body: id }
  );

  const res = await fetchOrderDetails.json();

  //fetch metadata
  const finalURL = 'orderdetail';
  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });
  const response = await fetchMetaData.json();

  return {
    props: { response: res, res: response.res[0] },
  };
}

const detail = (props) => {
  let details = props.response[0];

  return (
    <div>
      <Head>
        <meta name="description" content={props?.res?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.res?.title}</title>
      </Head>
      <Navbar />
      <Container>
        <div className="flex justify-center">
          <Image
            src={details.img}
            alt={details.name}
            width={300}
            height={300}
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex justify-between max-w-[300px] mx-auto mt-6">
          <p>Title</p>
          <p>{details.name.toUpperCase()}</p>
        </div>
        <div className="flex justify-between max-w-[300px] mx-auto mt-6">
          <p>Quantity</p>
          <p>X{details.quantity}</p>
        </div>
        <div className="flex justify-between max-w-[300px] mx-auto mt-6">
          <p>Price</p>
          <p>₹{details.price}</p>
        </div>

        <div className="flex justify-between max-w-[300px] mx-auto mt-6">
          <p>Total</p>
          <p>₹{details.quantity * details.price}</p>
        </div>
      </Container>
    </div>
  );
};

export default detail;
