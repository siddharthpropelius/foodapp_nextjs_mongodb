import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/future/image';
import React, { useState, useEffect } from 'react';
import i1 from '../../assets/i1.png';
import i2 from '../../assets/i2.png';
import i3 from '../../assets/i3.png';
import FoodWeatherCard from './FoodWeatherCard';
import axios from 'axios';

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
  useEffect(() => {
    const fetchAPI = async () => {
      const data = await axios.get('/api/dashboard/view');
      const result = data.data.res;
      const newDAta = [...result];
      const sort = newDAta.sort(() => Math.random() - Math.random());
      const randomData = sort.splice(1, 6);
      setFilteredData(randomData);
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
              <>
                <FoodWeatherCard
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  price={item.price}
                  img={item.img}
                  time={item.time}
                  des={item.des}
                  // quantity={item.quantity}
                />
              </>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            mt: '50px',
            mb: '40px',
            flexWrap: 'no wrap',
          }}
        >
          {imgData.map((item) => {
            return (
              <>
                <Box key={item.id}>
                  <Image src={item.img} alt={item.primary} />
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
                    {item.primary}
                  </Typography>
                  <Typography
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
                  </Typography>
                </Box>
              </>
            );
          })}
        </Box>
      </Container>
    </>
  );
};

export default FoodWeather;
