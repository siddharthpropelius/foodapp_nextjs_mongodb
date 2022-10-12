import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="bg-[white]">
      <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 ">
        <h1 className=" ">NoodleTown</h1>

        <ul className="hidden md:flex ">
          <li className="p-4 cursor-pointer">Menu</li>
          <li className="p-4 cursor-pointer">Cart</li>
          <li className="p-4 cursor-pointer">Logout</li>
          {/*  <li className='p-4 cursor-pointer'><LinkRouter to="/about" smooth={true} duration={500}>About</LinkRouter></li>*/}
        </ul>
        <div onClick={handleNav} className="block md:hidden mr-4 ">
          {nav ? (
            <AiOutlineClose className="fixed bg-[#131A26]" size={30} />
          ) : (
            <AiOutlineMenu size={30} />
          )}
        </div>
        <ul
          className={
            nav
              ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[white] ease-in-out duration-500'
              : 'ease-in-out duration-500 fixed left-[-100%]'
          }
        >
          <h1 className=" ">NoodleTown</h1>
          <li className="p-4 cursor-pointer border-b border-gray-600">Menu</li>
          <li className="p-4 cursor-pointer border-b border-gray-600">Cart</li>
          <li className="p-4 cursor-pointer border-b border-gray-600">
            Logout
          </li>
          {/*    <li className='p-4 cursor-pointer border-b border-gray-600'><LinkRouter to="/about" smooth={true} duration={500}>About</LinkRouter></li>*/}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
