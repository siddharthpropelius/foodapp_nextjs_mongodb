import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/future/image';
import React, { useState, useEffect } from 'react';
import i1 from '../../assets/i1.png';
import i2 from '../../assets/i2.png';
import i3 from '../../assets/i3.png';
import FoodWeatherCard from './FoodWeatherCard';
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/router';

const FoodWeather = () => {
  const imgData = [
    {
      id: 1,
      img: i1,
      primary: 'veggie friendly',
      secondery: '29 places near you',
    },
    {
      id: 2,
      img: i2,
      primary: 'trending this week',
      secondery: '29 places near you',
    },

    {
      id: 3,
      img: i3,
      primary: 'authentic',
      secondery: '29 places near you',
    },
  ];

  const [filtereddata, setFilteredData] = useState([]);
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  const router = useRouter();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await axiosInstance.get(
          'http://localhost:5000/api/food/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          }
        );
        const result = data.data.data;
        const newDAta = [...result];
        const sort = newDAta.sort(() => Math.random() - Math.random());
        const randomData = sort.splice(1, 6);
        setFilteredData(randomData);
      } catch (err) {
        if (err.response.status === 401) {
          alert('Unauthenticated User');
          router.push('/');
        } else {
          alert('Unauthenticated User!');
          router.push('/');
        }
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h6" sx={{ mt: '50px' }}>
          Food According to Weather
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            gap: { md: '63px', xs: '20px' },
            mt: '30px',
          }}
        >
          {filtereddata.map((item) => {
            return (
              <div key={item.id}>
                <FoodWeatherCard
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  price={item.price}
                  img={item.img}
                  time={item.time}
                  des={item.description}
                  // quantity={item.quantity}
                />
              </div>
            );
          })}
        </Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: 'unset',
            display: 'flex',
            gap: '10px',
            mt: '50px',
            mb: '40px',
            mx: 'auto',
            alignItems: 'center',
            overflowX: 'scroll',
            overflowY: 'hidden',
          }}
        >
          {imgData.map((item) => {
            return (
              <div key={item.id} className="mx-auto">
                <Box
                  key={item.id}
                  sx={{
                    width: '350px',
                    height: '400px',
                    maxWidth: 'unset',
                  }}
                >
                  <Image
                    src={item.img}
                    alt={item.primary}
                    className="w-[350px]"
                    style={{ maxWidth: 'unset' }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '16px',
                      zIndex: '4',
                      mt: {
                        xs: '-50px',
                        sm: '-40px',
                        md: '-50px',
                        lg: '-65px',
                      },
                      pl: '10px',
                      color: 'white',
                    }}
                  >
                    {item.primary.toUpperCase()}
                  </Typography>
                  {/* <Typography
                    variant="p"
                    sx={{
                      fontSize: '16px',
                      zIndex: '4',
                      mt: '-0px',
                      pl: '10px',
                      color: 'white',
                      display: { lg: 'block', xs: 'none' },
                    }}
                  >
                    {item.secondery}
                  </Typography> */}
                </Box>
              </div>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default FoodWeather;
