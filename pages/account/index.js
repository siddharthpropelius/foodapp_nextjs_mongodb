import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sliceAction } from '../../redux/slice/slice';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axiosInstance';
import Cookies from 'js-cookie';

export async function getServerSideProps(context) {
  //fetch metadata
  const fetchMetaData = await fetch(
    'http://localhost:5000/api/meta/by-id?metaId=4'
  );
  const response = await fetchMetaData.json();

  return {
    props: { res: response.data },
  };
}

export default function Account(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axiosInstance.get(
          'http://localhost:5000/api/user',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          }
        );
        setName(response.data.data.name);
        setEmail(response.data.data.email);
      } catch (err) {
        if (err.response.status === 401) {
          alert('Unauthenticated user!');
          router.push('/');
        } else {
          alert('Something went wrong! please login again');
          router.push('/');
        }
      }
    }

    fetchUser();
  }, []);

  const handleOnLogout = () => {
    dispatch(sliceAction.reset());
    router.push('/');
  };
  return (
    <>
      <Head>
        <meta name="description" content={props?.res?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.res?.keywords} />
        <meta name="author" content={props?.res?.author} />
        <title>{props?.res?.name}</title>
      </Head>
      <Navbar />
      <div className="flex justify-center flex-col mx-auto w-full items-center">
        <p>{name}</p>
        <p>{email}</p>
        <button
          className="rounded-md bg-[#FFC300] px-3 text-white py-1 mt-2 cursor-pointer"
          onClick={() => handleOnLogout()}
        >
          Logout
        </button>
      </div>
    </>
  );
}
