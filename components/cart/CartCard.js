import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CartCard = ({ id, item, name, img, quantity, price, des, total }) => {
  const { data: session } = useSession();
  const [response, setResponse] = useState('');
  const [qty, setQty] = useState(quantity);
  const [totalPrice, setTotalPrice] = useState(total);
  const addToCart = () => {
    axios
      .post('/api/cart/add', {
        item: item,
        name: name,
        img: img,
        price: price,
        user: session.user.email,
        quantity: 1,
      })
      .then((res) => {
        if (res.data === 'Cannot Add More than 5 Items') {
        } else {
          setQty(++qty);
          setTotalPrice(qty * price);
        }
        setResponse(res.data);
        setTimeout(() => {
          setResponse('');
        }, 2000);
      });
  };

  const removeFromCart = () => {
    axios
      .post('/api/cart/remove', {
        item: item,
        user: session.user.email,
        price: price,
      })
      .then((res) => {
        if (qty === 1) {
          // const filter = cartList.filter((item) => item.item !== item);
          // console.log('filter::::::::', filter);
          window.location.reload();
          return;
        } else {
          setQty(--qty);
          setTotalPrice(qty * price);
        }
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
          gap: '10px',
          py: 2,
          justifyContent: { md: 'space-around' },
          marginX: 'auto',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row-reverse' },
          }}
        >
          <Box sx={{ pl: 4 }}>
            <Typography sx={{ fontWeight: 'bold' }}>{name}</Typography>
            <Box
              sx={{
                mt: 1,
                flexWrap: 'nowrap',
              }}
            >
              <button
                className="px-2 bg-[#FFA500] text-white rounded mr-2"
                onClick={() => removeFromCart()}
              >
                -
              </button>
              {qty}
              <button
                className="px-2 bg-[#FFA500] text-white rounded mx-2"
                onClick={() => addToCart()}
              >
                +
              </button>
            </Box>
            <Typography sx={{ fontSize: '12px', mt: 1, ml: 1 }}>
              {response}
            </Typography>
          </Box>
          <Image
            src={img}
            alt={name}
            width={150}
            height={150}
            objectFit="cover"
            style={{
              borderRadius: '10px',
            }}
          />
        </Box>

        <Box>
          <Typography>Price : ₹{price}</Typography>
        </Box>
        <Box>
          <Typography>Total : ₹{totalPrice}</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CartCard;
