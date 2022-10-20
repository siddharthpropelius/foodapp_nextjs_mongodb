import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const Restro = (props) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/restro/${id}`);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mt: '40px' }}>
          Top brands for you
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            overflowX: 'scroll',
            gap: '20px',
            mt: '30px',
            px: 2,
          }}
        >
          {props.data.map((item) => {
            return (
              <div key={item._id}>
                <Image
                  src={item.img}
                  alt={item.name}
                  width={120}
                  height={120}
                  style={{ width: '120px', cursor: 'pointer' }}
                  onClick={() => handleClick(item.Rid)}
                />
              </div>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Restro;
