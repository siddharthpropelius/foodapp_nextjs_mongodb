import Login from '../components/auth/Login';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

export default function Home() {
  return (
    <>
      <Login />
    </>
  );
}
