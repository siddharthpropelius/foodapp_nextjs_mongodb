import { Container, Typography } from '@mui/material';
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartCard from './CartCard';

const Index = ({ cart }) => {
  const [total, setTotal] = useState(0);
  console.log(cart.length);

  useEffect(() => {
    cart.forEach((item) => {
      const calculateTotal = cart.reduce(
        (total, currentItem) => (total = total + currentItem.total),
        0
      );
      setTotal(calculateTotal);
    });
  }, []);

  const handleOrderBtn = () => {
    axios.post('/api/order/add', { cart }).then((res) => {});
  };
  return (
    <div>
      <Container>
        <Typography variant="h5" sx={{ mt: '50px' }}>
          Your Cart
        </Typography>
      </Container>
      {cart.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '100px' }}>
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
            Nothing in Cart. Add Something
          </Typography>
        </Box>
      ) : (
        <>
          <Container>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: { md: 'row', xs: 'column' },
                marginTop: 5,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 2 }}>
                {cart?.map((item) => {
                  return (
                    <div key={item._id}>
                      <CartCard
                        id={item._id}
                        item={item.item}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        img={item.img}
                        des={item.des}
                        total={item.total}
                      />
                    </div>
                  );
                })}
              </Box>
            </Box>
          </Container>

          <Box sx={{ mt: '20px' }}>
            <div className="w-full flex justify-center pl-5">
              <div className="border px-12 py-6 rounded">
                <h1 className="text-2xl text-[#FFC200] pb-4"> ORDER SUMMARY</h1>
                <hr />
                <div className="flex justify-between mt-4">
                  <p className="font-bold text-xl">Sub Total :</p>
                  <p className="font-bold text-xl">₹{total}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="font-bold text-xl">Delivery Charge :</p>
                  <p className="font-bold text-xl">₹15</p>
                </div>

                <br />
                <hr />
                <div className="flex justify-between pb-4">
                  <p className="font-bold text-xl">Total :</p>
                  <p className="font-bold text-xl">₹{total + 15}</p>
                </div>
                <hr />
              </div>
            </div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: '30px',
              pb: '50px',
            }}
          >
            <Typography
              sx={{
                backgroundColor: '#F6B716',
                color: '#FFFFFF',
                width: '40%',
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '10px',
                paddingY: '10px',
                marginBottom: '10px',
              }}
              onClick={handleOrderBtn}
            >
              Order Now
            </Typography>
          </Box>
        </>
      )}
    </div>
  );
};

export default Index;
