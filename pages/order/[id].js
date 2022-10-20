import { Box, Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import Navbar from '../../components/layout/Navbar';
import { format, compareAsc } from 'date-fns';

export async function getServerSideProps(context) {
  let id = context.query.id;
  const fetchOrderDetails = await fetch(
    'http://localhost:3000/api/order/details',
    { method: 'POST', body: id }
  );

  const response = await fetchOrderDetails.json();

  return {
    props: { response },
  };
}

const detail = (props) => {
  let details = props.response[0];
  let date = details.date;
  const formatDate = format(Date.parse(date), 'ccc dd LLL yyyy');

  return (
    <div>
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
          <p>₹{details.total}</p>
        </div>
        <div className="flex justify-between max-w-[300px] mx-auto mt-6">
          <p>Ordered On</p>
          <p>{formatDate}</p>
        </div>
      </Container>
    </div>
  );
};

export default detail;
