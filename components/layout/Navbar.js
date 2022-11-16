import { Container, IconButton, Badge } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import styled from '@emotion/styled';
import { signOut } from 'next-auth/react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({}));
  const qty = useSelector((state) => state.slice.qty);
  return (
    <div className="bg-[white] z-999 overflow-hidden">
      <Container>
        <div className="flex justify-center md:justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ">
          <h1 className=" text-[#FFC300] hidden md:block">
            <Link href="/home"> NoodleTown</Link>
          </h1>

          <ul className="flex mx-2">
            <li className="p-4 cursor-pointer">
              <Link href="/menu">
                <IconButton aria-label="cart">
                  <RestaurantMenuIcon />
                </IconButton>
              </Link>
            </li>

            <li className="p-4 cursor-pointer">
              <Link href="/cart">
                <StyledBadge badgeContent={qty} color="primary">
                  <IconButton aria-label="cart">
                    <ShoppingCartIcon />
                  </IconButton>
                </StyledBadge>
              </Link>
            </li>
            <li className="p-4 cursor-pointer">
              <Link href="/order">
                <IconButton aria-label="cart">
                  <ShoppingBagIcon />
                </IconButton>
              </Link>
            </li>
            <li className="p-4 cursor-pointer">
              <Link href="/account">
                <IconButton aria-label="cart">
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </li>
            <li
              className="p-4 cursor-pointer"
              onClick={() => signOut('google', { callbackUrl: 'http://localhost:3000/' })}
            >
              <IconButton aria-label="cart">
                <LogoutIcon />
              </IconButton>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
