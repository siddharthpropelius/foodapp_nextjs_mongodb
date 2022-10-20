import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const index = ({ orders }) => {
  console.log(orders);
  return (
    <div>
      <Container>
        <Typography variant="h4" sx={{ textDecoration: 'underline', ml: 2 }}>
          Orders
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 5,
          }}
        >
          {orders?.map((item) => {
            return (
              <>
                <Box key={item._id} sx={{ border: '1px solid black' }}>
                  <Image
                    src={item.img}
                    width={250}
                    height={250}
                    alt={item.name}
                    objectFit="cover"
                    className=""
                  />
                  <Typography sx={{ px: 1 }}>
                    {item.name.toUpperCase()}
                  </Typography>
                  <p className="px-1 pb-1 hover:underline cursor-pointer">
                    <Link href={`/order/${item._id}`}> View Details</Link>
                  </p>
                </Box>
              </>
            );
          })}
        </Box>
      </Container>
    </div>
  );
};

export default index;
