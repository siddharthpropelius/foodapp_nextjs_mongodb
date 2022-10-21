import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import r1 from '../../assets/r1.png';
import r2 from '../../assets/r2.png';
import r3 from '../../assets/r3.png';

const Header = () => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Box>
          <Image
            src={r1}
            alt="food"
            style={{ objectFit: 'cover', width: '100%', height: '81%' }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Image
            src={r2}
            alt="food"
            style={{ objectFit: 'cover', width: '100%', height: '40%' }}
          />
          <Image
            src={r3}
            alt="food"
            style={{ objectFit: 'cover', width: '100%', height: '40%' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;
