import Image from 'next/image';
import React from 'react';
import google from '../../assets/google.jpeg';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className="h-screen py-auto ">
      <div className="flex flex-col w-3/4 md:w-1/4 m-auto mt-[10%] ">
        <h2 className="mx-auto md:text-4xl text-2xl text-[#FFC300] mt-2">NOODLETOWN</h2>
        <button
          className="mt-[200px] bg-white text-blue-500 w-[300px] px-2 py-1 mx-auto flex gap-12 mb-2"
          onClick={() => signIn()}
        >
          <Image src={google} alt="google signin" width={20} height={20} />
          <h2>SIGN IN WITH GOOGLE</h2>
        </button>
      </div>
    </div>
  );
};

export default Login;
