import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import v1 from '../../assets/v2.png';
import v2 from '../../assets/v1.png';
import Image from 'next/future/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slice/slice';

export const categoryList = [
  {
    id: 0,
    name: 'pizza',
  },
  {
    id: 1,
    name: 'burger',
  },
  {
    id: 2,
    name: 'garlic',
  },
  {
    id: 3,
    name: 'lasagna',
  },
  {
    id: 4,
    name: 'dessert',
  },
];

const PopularRecipes = (props) => {
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  let category = 'pizza';
  useEffect(() => {
    async function fetchData() {
      await axios
        .post('/api/dashboard/getbycategory', { category: category })
        .then((res) => {
          setRecipes(res.data);
        });
    }
    fetchData();
  }, []);

  const handleOnClick = async (name) => {
    let category = name;
    await axios
      .post('/api/dashboard/getbycategory', { category: category })
      .then((res) => {
        setRecipes(res.data);
      });
  };

  const handleOnAdd = (name) => {
    dispatch(addToCart(name));
    props.handler(name);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: { md: 'block', xs: 'none' } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Image
            src={v1}
            alt="vector"
            style={{ left: 0, position: 'absolute' }}
          />
          <Image
            src={v2}
            alt="vector"
            style={{ right: 0, position: 'absolute' }}
          />
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          mt: '150px',
        }}
      >
        Popular Recipes
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { md: 'center', xs: 'space-between' },
          gap: '5px',
          marginTop: '30px',
          px: '8px',
          overflowX: 'scroll',
        }}
      >
        {categoryList.map((item) => {
          return (
            <>
              <Button
                key={item.id}
                sx={{
                  maxWidth: 'unset',
                  width: '200px',
                  backgroundColor: item.name === category ? '#F6B716' : '#FFF',
                  color: item.name === category ? 'red' : '#000',
                  borderRadius: '45px',
                  px: '40px',
                  '&:hover': {
                    backgroundColor: '#F6B716',
                    color: '#fff',
                  },
                }}
                onClick={() => handleOnClick(item.name)}
              >
                {item.name}
              </Button>
            </>
          );
        })}
      </Box>
      <Box sx={{ mt: '50px', px: { xs: '6px', md: '30px' } }}>
        <Swiper
          loop={true}
          spaceBetween={30}
          slidesPerView={4}
          modules={[Pagination, Autoplay]}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2,
            },
            300: {
              width: 300,
              slidesPerView: 1,
            },
          }}
        >
          {recipes.map((item) => {
            return (
              <>
                <SwiperSlide>
                  <Box
                    className="ds"
                    sx={{
                      width: '310px',
                      height: '500px',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '25px',
                      cursor: 'pointer',
                    }}
                    key={item.id}
                    onClick={() => handleOnAdd(item)}
                  >
                    <img
                      src={item.img}
                      alt="food"
                      style={{
                        width: '100%',
                        height: '70%',
                        objectFit: 'cover',
                        borderRadius: '25px 25px 0px 0px',
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        px: '20px',
                        pt: '20px',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ px: '20px' }}>{item.des}</Typography>
                    <Typography sx={{ px: '20px', pb: '20px' }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PopularRecipes;
