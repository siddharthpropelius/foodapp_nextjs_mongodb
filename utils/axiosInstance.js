import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const BASE_URL = `http://localhost:5000/api`;
// const cookie = context.req.cookies;

const axiosInstance = axios.create({
  BASE_URL,
});

axiosInstance.interceptors.request.use(async (req) => {
  const accessToken = req?.headers?.Authorization?.split(' ');
  const refreshToken = req?.headers?.refreshToken?.split(' ');

  try {
    const user = jwt_decode(accessToken?.[1] ? accessToken[1] : '');
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    } else {
      const newRefreshToken = await axios.post(`${BASE_URL}/refresh-token`, {
        refreshToken: refreshToken?.[1] ? refreshToken[1] : '',
      });
      req.headers.Authorization = `Bearer ${newRefreshToken.data.newAccessToken}`;
      Cookies.set('refreshToken', newRefreshToken.data.newRefreshToken);
      return req;
    }
  } catch (err) {
    return req;
  }
});

export default axiosInstance;
