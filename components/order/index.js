import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const index = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchOrders() {
      try {
        await axiosInstance
          .get('http://localhost:5000/api/orders', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          })
          .then((res) => {
            setData(res.data.data);
          });
      } catch (err) {
        if (err.response.status === 401) {
          alert('Unauthenticated User!');
          router.push('/');
        } else {
          alert('Unauthenticated User!');
          router.push('/');
        }
      }
    }
    fetchOrders();
  }, []);
  return (
    <div>
      <Container>
        <Typography variant="h4" sx={{ textDecoration: 'underline', ml: 2 }}>
          Orders
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
          {data.length === 0 ? (
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
                {"Nothing's Here. Order Something!"}
              </Typography>
            </Box>
          ) : (
            <>
              {data?.map((item) => {
                return (
                  <>
                    <Box
                      key={item.id}
                      sx={{ border: '1px solid black', borderRadius: '5px' }}
                    >
                      <Image
                        src={item.items[0].fooditems.img}
                        width={250}
                        height={250}
                        alt={item.name}
                        objectFit="cover"
                      />
                      <Typography sx={{ px: 1 }}>
                        {item.items[0].fooditems.name}
                      </Typography>
                      <p className="px-2 pb-1 hover:underline cursor-pointer">
                        <Link href={`/order/${item.id}`}> View Details</Link>
                      </p>
                    </Box>
                  </>
                );
              })}
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default index;
