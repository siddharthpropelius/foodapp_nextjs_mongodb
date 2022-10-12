import React from 'react';
import Poster from '../../assets/playstore.png';
import Container from '@mui/material/Container';
import Image from 'next/image';

const PosterItem4 = () => {
  return (
    <Container>
      <div className="my-16">
        <Image src={Poster} alt="poster" />
      </div>
    </Container>
  );
};

export default PosterItem4;
