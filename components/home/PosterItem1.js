import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import poster1 from '../../assets/poster1.png';

const PosterItem1 = () => {
  return (
    <>
      <Box sx={{ position: 'relative', marginTop: '100px' }}>
        <Image src={poster1} alt="poster" style={{ margin:'auto' }} />
        <Box sx={{ position: 'absolute', inset: '0', top: '40%', left: '10%' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: { md: '44px', sm: '36px', xs: '20px',xl:'56px' },
              paddingLeft:{xl:'300px'}
            }}
          >
            Fastest food <span style={{ color: '#FFC200' }}>delivery</span> in{' '}
            <br />
            the town
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default PosterItem1;
