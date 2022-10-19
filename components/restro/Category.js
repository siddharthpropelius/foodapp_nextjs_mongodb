import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import CategoryCard from './CategoryCard';
import { Sort } from '@mui/icons-material';

const Category = (props) => {
  const router = useRouter();
  let id = router.query.id;
  const [category, setCategory] = useState('Recommended');
  const [data, setData] = useState([]);
  useEffect(() => {
    Recommended();
  }, []);

  const Recommended = async () => {
    axios
      .post('/api/restro/getfoodbycategory', {
        Rid: id,
        category: category.toLowerCase(),
      })
      .then((res) => {
        const sort = res.data.res.sort(() => Math.random() - Math.random());
        setData(sort);
      });
  };

  const onClickHandler = async (name) => {
    await axios
      .post('/api/restro/getfoodbycategory', {
        Rid: id,
        category: name.toLowerCase(),
      })
      .then((res) => {
        setData(res.data.res);
      });
    setCategory(name);
  };

  return (
    <Container sx={{ my: '50px' }}>
      <Typography variant="h4">Order Online</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          mt: '30px',
          flexDirection: { md: 'row', xs: 'column' },
          flex: 3,
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', md: 'block' },
            overflowX: 'scroll',
            flex: 1 / 2,
            textAlign: { md: 'left', xs: 'center' },
          }}
        >
          {props?.data[0]?.category?.map((item) => {
            return (
              <>
                <Typography
                  onClick={() => onClickHandler(item)}
                  sx={{
                    cursor: 'pointer',
                    color: item == category ? 'white' : 'black',
                    backgroundColor: item == category ? '#FFC300' : '',
                    p: '10px',
                    flex: 4,
                  }}
                >
                  {item}
                </Typography>
              </>
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {data?.map((item) => {
            return (
              <>
                <CategoryCard
                  id={item._id}
                  name={item.name}
                  category={item.category}
                  des={item.description}
                  price={item.price}
                  img={item.img}
                  tIme="15"
                />
              </>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Category;
