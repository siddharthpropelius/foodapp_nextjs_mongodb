import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { sliceAction } from '../../redux/slice/slice';
import { useDispatch, useSelector } from 'react-redux';

const CategoryCard = ({ id, name, des, price, img, category }) => {
  const cart = useSelector((state) => state.slice.food);
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();

  const addToCart = ({ foodId, name, img, price }) => {
    const find = cart.find((item) => item.id === id);
    if (find?.quantity === 5) {
      setResponse({ error: 'Cannot add more than 5 quantity' });
      setTimeout(() => {
        setResponse({});
      }, 1000);
    } else {
      setResponse({ success: 'Item added to cart' });
      setTimeout(() => {
        setResponse('');
      }, 1000);
    }
    dispatch(
      sliceAction.addToCart({
        foodId: foodId,
        name: name,
        img: img,
        price: price,
      })
    );
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
            className="object-cover"
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
                    foodId: id,
                    name: name,
                    time: 15,
                    img: img,
                    price: price,
                    des: des,
                  })
                }
                className="bg-[#FFC300] text-white p-1 rounded-md"
              >
                Add to Cart
              </button>
            </>
          </Box>
          <Typography sx={{ mt: 1, ml: 1, color: 'red' }}>
            {response.error}
          </Typography>
          <Typography sx={{ mt: 1, ml: 1, color: 'green' }}>
            {response.success}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CategoryCard;
