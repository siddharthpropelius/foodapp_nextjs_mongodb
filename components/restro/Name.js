import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';

const Name = (props) => {
  return (
    <div>
      <Container>
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                src={props?.restaurant?.restaurant?.data?.img}
                alt="food"
                width={200}
                height={200}
              />
            </Box>
            <Box sx={{ ml: '30px', mt: '20px' }}>
              <Typography variant="h5">
                {props?.restaurant?.restaurant?.data?.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: { md: '100px', xs: '40px' },
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ paddingY: '10px' }}>
                  <Typography sx={{ color: '#999999' }}>
                    {props?.restaurant?.restaurant?.data?.description}
                  </Typography>
                  <Typography sx={{ color: '#999999' }}>
                    {props?.restaurant?.restaurant?.data?.location}
                  </Typography>
                  <Typography>
                    <span style={{ color: '#C84B11' }}>Open Now </span>
                    {props?.props?.restaurant?.restaurant?.data?.opens_at}pm -
                    {props?.props?.restaurant?.restaurant?.data?.close_at}pm
                    (Today)
                  </Typography>
                </Box>
                <Box>
                  <span style={{ color: '#999999' }}>Average Cost </span>700rs
                  for 2 person
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      </Container>
    </div>
  );
};

export default Name;
