import { Container, IconButton, Badge } from "@mui/material";
import Link from "next/link";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { sliceAction } from "../../redux/slice/slice";
const Navbar = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({}));
  const qty = useSelector((state) => state.slice.qty);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    console.log("Clicked! on Navbar");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(sliceAction.reset());
    router.push("/auth/login");
  };
  return (
    <div className="bg-[white] z-999 overflow-hidden">
      <Container>
        <div className="flex justify-center md:justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ">
          <h1 className=" text-[#FFC300] hidden md:block">
            <Link href="/home"> NoodleTown</Link>
          </h1>

          <ul className="flex mx-2">
            <li className="p-4 cursor-pointer">
              <Link href="/home">
                <IconButton aria-label="home">
                  <HomeIcon />
                </IconButton>
              </Link>
            </li>

            <li className="p-4 cursor-pointer">
              <Link href="/menu">
                <IconButton aria-label="menu">
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
                <IconButton aria-label="orders">
                  <ShoppingBagIcon />
                </IconButton>
              </Link>
            </li>
            <li className="p-4 cursor-pointer">
              <Link href="/account">
                <IconButton aria-label="account">
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </li>
            <li
              className="p-4 cursor-pointer hidden lg:block"
              onClick={handleOnLogout}
            >
              <IconButton aria-label="logout">
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
