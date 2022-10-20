import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const index = ({ orders }) => {
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
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 5,
          }}
        >
          {orders.length === 0 ? (
            <Box
              sx={{ display: 'flex', justifyContent: 'center', mt: '100px' }}
            >
              <Typography
                sx={{
                  fontSize: {
                    md: '28px',
                    sm: '22px',
                    xs: '20px',
                  },
                  color: '#FFC200',
                }}
              >
                {"Nothing's Here. Order Something!"}
              </Typography>
            </Box>
          ) : (
            <>
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
                      <p className="px-2 pb-1 hover:underline cursor-pointer">
                        <Link href={`/order/${item._id}`}> View Details</Link>
                      </p>
                    </Box>
                  </>
                );
              })}
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default index;
