import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Search = ({ search }) => {
  console.log('ITEM SEARCHED====>>>>>', search);
  const router = useRouter();
  const id = router.query.id;
  const [data, setData] = useState([]);

  return <div></div>;
};

export default Search;
