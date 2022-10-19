import React from 'react';
import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import img from '../../assets/hero.jpg';
import { Box } from '@mui/system';
import Image from 'next/future/image';

const Hero = () => {
  const StyledDiv = styled('div')({
    position: 'relative',
    margin: 'auto',
    background: 'rgba(0, 0, 0, 0.46)',
    height: '349px',
  });

  return (
    <div>
      <Image
        src={img}
        alt="hero-img"
        className="w-full absolute h-[349px] object-cover"
      />
      <StyledDiv>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            color: 'white',
            paddingTop: { lg: '4%', md: '10%', sm: '10%', xs: '25%' },
          }}
        >
          <Typography
            variant="h2"
            fontWeight={900}
            sx={{
              display: { md: 'block', sm: 'block', xs: 'none' },
            }}
          >
            NOODLETOWN
          </Typography>
          <Typography
            variant="h5"
            sx={{
              display: { md: 'block', sm: 'block', xs: 'none' },
              pt: 2,
              pb: 6,
            }}
          >
            discover best food around you
          </Typography>
          <Box
            sx={{
              backgroundColor: '#D9D9D9',
              width: { xs: '250px', sm: '400px' },
              borderRadius: '5px',
            }}
          >
            <TextField
              id="filled-basic"
              label="Search for restuarant, cuisine, place"
              variant="filled"
              fullWidth
            />
          </Box>
        </Box>
      </StyledDiv>
    </div>
  );
};

export default Hero;
