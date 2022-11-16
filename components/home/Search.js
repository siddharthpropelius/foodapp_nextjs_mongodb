import { Box, Container, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sliceAction } from '../../redux/slice/slice';

const Search = ({ search }) => {
  console.log(search);
  const router = useRouter();
  const txtRef = useRef();
  const id = router.query.id;
  const [data, setData] = useState(search.res);
  const [response, setResponse] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.slice.food);

  const handleOnClick = (item) => {
    const foodId = item.id;
    const name = item.name;
    const img = item.img;
    const price = item.price;

    const find = cart.find((item) => item.foodId === foodId);
    console.log(find);
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
    dispatch(sliceAction.addToCart({ foodId, name, img, price }));
  };
  return (
    <div>
      <div>
        <Container>
          <TextField
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                const input = txtRef.current.value;
                router.push(`/home/${input}`);
                let res = search.res;
                setData(res);
              }
            }}
            label="Search for restuarant, cuisine, place"
            inputRef={txtRef}
            variant="filled"
            fullWidth
          />
          <Typography sx={{ mt: 1, ml: 1, color: 'red' }}>
            {response.error}
          </Typography>
          <Typography sx={{ mt: 1, ml: 1, color: 'green' }}>
            {response.success}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            {search.length === 0 ? (
              <Box
                sx={{ display: 'flex', justifyContent: 'center', mt: '100px' }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      md: '28px',
                      sm: '22px',
                      xs: '20px',
                    },
                    color: '#FFC200',
                  }}
                >
                  {'No Match Found!'}
                </Typography>
              </Box>
            ) : (
              <>
                {search?.map((item) => {
                  return (
                    <div key={item.id}>
                      <Box
                        sx={{
                          border: '1px solid black',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleOnClick(item)}
                      >
                        <Image
                          src={item.img}
                          width={250}
                          height={250}
                          alt={item.name}
                          objectFit="cover"
                          className=""
                        />
                        <Typography sx={{ px: 1 }}>
                          {item.name.toUpperCase()}
                        </Typography>
                        <Typography sx={{ px: 1 }}>₹{item.price}</Typography>
                      </Box>
                    </div>
                  );
                })}
              </>
            )}
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Search;
