import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Name = (props) => {

  return (
    <div>
      <Container>
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src={props.data[0]?.img}
                alt="food"
                width={200}
                height={100}
              />
            </Box>
            <Box sx={{ ml: '30px', mt: '20px' }}>
              <Typography variant="h5">{props.data[0]?.name}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: { md: '100px', xs: '40px' },
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ paddingY: '10px' }}>
                  <Typography sx={{ color: '#999999' }}>
                    {props.data[0]?.des}
                  </Typography>
                  <Typography sx={{ color: '#999999' }}>
                    {props.data[0]?.location}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#C84B11' }}>Open Now </span>11pm -
                    11pm (Today)
                  </Typography>
                </Box>
                <Box>
                  <span style={{ color: '#999999' }}>Average Cost </span>700rs
                  for 2 person
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      </Container>
    </div>
  );
};

export default Name;
