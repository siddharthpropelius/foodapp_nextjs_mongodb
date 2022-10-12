import { Box } from '@mui/system';
import React from 'react';
import PosterItem1 from './PosterItem1';
import PosterItem2 from './PosterItem2';
import PosterItem3 from './PosterItem3';
import PosterItem4 from './PosterItem4';

const PosterContainer = () => {
  return (
    <div>
      <PosterItem1 />
      <PosterItem2 />
      <PosterItem3 />
      <Box>
        <PosterItem4 />
      </Box>
    </div>
  );
};

export default PosterContainer;
