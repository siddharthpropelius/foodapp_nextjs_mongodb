import { Box, Container, Typography } from '@mui/material';
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
              <>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '120px', cursor: 'pointer' }}
                  onClick={() => handleClick(item.Rid)}
                />
              </>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default Restro;
