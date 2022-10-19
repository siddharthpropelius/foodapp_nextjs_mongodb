import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/future/image';
import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { addToCart } from '../../redux/slice/slice';

const CategoryCard = ({ id, name, des, price, img, category }) => {
  const { data: session } = useSession();
  const [response, setResponse] = useState('');
  const addToCart = (props) => {
    axios
      .post('/api/cart/add', {
        item: props.id,
        name: props.name,
        img: props.img,
        category: props.category,
        price: props.price,
        user: session.user.email,
        quantity: 1,
      })
      .then((res) => {
        setResponse(res.data);
        setTimeout(() => {
          setResponse('');
        }, 2000);
      });
  };
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          p: '10px',
          flexDirection: { sm: 'row', xs: 'column' },
        }}
        key={id}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: { sm: '211px' },
            height: '186px',
          }}
        >
          <Image
            src={img}
            alt={name}
            width={500}
            height={500}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '186px',
              borderRadius: '20px',
            }}
          />
        </Box>
        <Box sx={{ pl: '20px', pt: '20px', justifyContent: 'center' }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="p" sx={{ color: '#848484' }}>
            {des}
          </Typography>
          <br />
          <Typography variant="p">₹{price}</Typography>
          <Box sx={{ pt: '25px' }}>
            <>
              <button
                onClick={() =>
                  addToCart({
                    id: id,
                    name: name,
                    time: 15,
                    img: img,
                    price: price,
                    des: des,
                    category: category,
                  })
                }
                className="bg-[#FFC300] text-white p-1 rounded-md"
              >
                Add to Cart
              </button>
            </>
          </Box>
          <Typography sx={{ mt: 1, ml: 1 }}>{response}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CategoryCard;
