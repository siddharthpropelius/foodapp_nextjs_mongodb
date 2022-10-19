import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FoodWeatherCard = ({ id, name, time, img, des, price }) => {
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleOnClick = (itemid) => {};
  return (
    <>
      <Box
        onClick={() => handleOnClick(id)}
        sx={{
          width: {
            xs: '200px',
            sm: '200px',
            md: '250px',
            lg: '300px',
          },
          cursor: 'pointer',
        }}
      >
        <img
          src={img}
          alt={name}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '200px',
            borderRadius: '20px 20px 0px 0px',
          }}
        />
        <Typography variant="h6" sx={{ pt: '8px' }}>
          {name}
        </Typography>
        <Typography variant="p" sx={{ color: '#999999', pb: '8px' }}>
          15 Min
        </Typography>
        {message ? (
          <Typography sx={{ color: 'green' }}>Item added to cart</Typography>
        ) : (
          ''
        )}
        {error ? (
          <Typography sx={{ color: 'red' }}>
            Cant add mor than 5 items
          </Typography>
        ) : (
          ''
        )}
      </Box>
    </>
  );
};

export default FoodWeatherCard;
