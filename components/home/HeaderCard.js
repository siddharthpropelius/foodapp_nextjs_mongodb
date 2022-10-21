import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import Image from 'next/future/image';
import React from 'react';
import c1 from '../../assets/c1.png';
import c2 from '../../assets/c2.png';
import c3 from '../../assets/c3.png';
import c4 from '../../assets/c4.png';
import c5 from '../../assets/c5.png';
import c6 from '../../assets/c6.png';

const HeaderCard = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            overflowY: 'hidden',
            marginTop: '40px',
            gap: '40px',
          }}
        >
          <Box
            sx={{
              width: '620px',
              height: '220px',
              maxWidth: 'unset',
              backgroundColor: '#F5F5F5',
            }}
          >
            <Box>
              <Image
                src={c1}
                alt="food"
                className="w-[380px] h-[120px]"
                style={{ maxWidth: 'unset' }}
              />
            </Box>
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2, pb: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '600px',
              height: '220px',
              maxWidth: '600px',
              backgroundColor: '#F5F5F5',
            }}
          >
            <Image
              src={c2}
              alt="food"
              className="w-[380px] h-[120px]"
              style={{ maxWidth: 'unset' }}
            />
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
          <Box
            sx={{
              width: '600px',
              height: '220px',
              maxWidth: '600px',
              backgroundColor: '#F5F5F5',
            }}
          >
            <Image
              src={c3}
              alt="food"
              className="w-[380px] h-[120px]"
              style={{ maxWidth: 'unset' }}
            />
            <Typography variant="h5" sx={{ px: 2, pt: 2 }}>
              Dinning Out
            </Typography>
            <Typography variant="p" sx={{ px: 2, pb: 2 }}>
              Explore curated lists of top restaurants.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ my: '18px' }}>
          <Typography
            sx={{
              pt: '60px',
              color: '#FFC200',
              fontSize: { md: '48px', sm: '38px', xs: '32px' },
            }}
          >
            Our best delivered cuisines
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'space-around',
              gap: '10px',
              mt: '60px',
              alignItem: 'center',
              alignContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: { md: '100%', xs: '170px' },
              }}
            >
              <Image src={c4} alt="food" width={500} height={500} />
              <Typography
                variant="p"
                sx={{
                  marginX: 'auto',
                  justifyContent: 'center',
                  mt: '10px',
                  display: { md: 'block', xs: 'none' },
                }}
              >
                Chicken Noodles
              </Typography>
            </Box>
            <Box
              sx={{
                width: { md: '400px', xs: '50px' },
                mx: 'auto',
                transform: { xs: 'rotateZ(90Deg)', md: 'rotateZ(180Deg)' },
                marginTop: '20px',
                marginBottom: '20px',
                my: { md: 'auto' },
              }}
            ></Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: { md: '100%', xs: '170px' },
              }}
            >
              <Image src={c5} alt="food" width={500} height={500} />
              <Typography
                variant="p"
                sx={{
                  marginX: 'auto',
                  justifyContent: 'center',
                  mt: '10px',
                  display: { md: 'block', xs: 'none' },
                }}
              >
                French Fries
              </Typography>
            </Box>
            <Box
              sx={{
                width: { md: '400px', xs: '50px' },
                mx: 'auto',
                transform: { xs: 'rotateZ(90Deg)', md: 'rotateZ(180Deg)' },
                marginTop: '20px',
                marginBottom: '20px',
                my: { md: 'auto', sm: 'auto' },
              }}
            ></Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                m: 'auto',
                width: { md: '100%', xs: '170px' },
              }}
            >
              <Image src={c6} alt="food" width={500} height={500} />
              <Typography
                variant="p"
                sx={{
                  marginX: 'auto',
                  justifyContent: 'center',
                  mt: '10px',
                  display: { md: 'block', xs: 'none' },
                }}
              >
                Avacado Mint Noodles
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeaderCard;
