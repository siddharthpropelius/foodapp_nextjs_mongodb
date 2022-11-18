import Head from "next/head";
import Navbar from "../../components/layout/Navbar";
import FoodWeather from "../../components/menu/FoodWeather";
import Restro from "../../components/menu/Restro";
import axiosInstance from "../../utils/axiosInstance";

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.cookies;
    //get metadata from server
    const fetchMetaData = await fetch(
      "http://localhost:5000/api/meta/by-id?metaId=2"
    );
    const response = await fetchMetaData.json();

    const getRestaurants = await axiosInstance.get(
      "http://localhost:5000/api/restaurant",
      {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
          refreshToken: `Bearer ${cookie.refreshToken}`,
        },
      }
    );
    const restaurantResult = await getRestaurants;
    return {
      props: { response, restaurant: restaurantResult.data },
    };
  } catch (err) {
    const error = err;
    return {
      props: { error: error },
    };
  }
}

export default function Index(props) {
  return (
    <div>
      <Head>
        <meta name="description" content={props?.response?.data?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={props?.response?.data?.author} />
        <title>{props?.response?.data.name}</title>
      </Head>
      <Navbar />
      <Restro data={props} />
      <FoodWeather data={props} />
    </div>
  );
}
