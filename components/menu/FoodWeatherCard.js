import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { sliceAction } from '../../redux/slice/slice';
import { useDispatch } from 'react-redux';

const FoodWeatherCard = ({ id, name, img, price }) => {
  const { data: session } = useSession();
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();

  const handleOnClick = (props) => {
    dispatch(sliceAction.addToCart({ props }));
    axios
      .post('/api/cart/add', {
        item: props.id,
        name: props.name,
        img: props.img,
        price: props.price,
        user: session.user.email,
        quantity: 1,
      })
      .then((res) => {
        console.log(res);
        setResponse(res.data);
        setTimeout(() => {
          setResponse('');
        }, 2000);
      });
  };
  return (
    <>
      <Box
        onClick={() => handleOnClick({ id, name, img, price })}
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
        <Image
          src={img}
          alt={name}
          width={500}
          height={400}
          objectFit="cover"
          style={{
            borderRadius: '20px 20px 0px 0px',
          }}
        />
        <Typography variant="h6" sx={{ pt: '8px' }}>
          {name}
        </Typography>
        <Typography variant="p" sx={{ color: '#999999', pb: '8px' }}>
          15 Min
        </Typography>

        <Typography>{response}</Typography>
      </Box>
    </>
  );
};

export default FoodWeatherCard;
