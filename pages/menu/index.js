import Head from "next/head";
import Navbar from "../../components/layout/Navbar";
import FoodWeather from "../../components/menu/FoodWeather";
import Restro from "../../components/menu/Restro";
import axiosInstance from "../../utils/axiosInstance";
import i1 from "../../assets/i1.png";
import i2 from "../../assets/i2.png";
import i3 from "../../assets/i3.png";

export async function getServerSideProps(context) {
  try {
    const imgData = [
      {
        id: 1,
        img: i1,
        primary: "veggie friendly",
        secondery: "29 places near you",
      },
      {
        id: 2,
        img: i2,
        primary: "trending this week",
        secondery: "29 places near you",
      },

      {
        id: 3,
        img: i3,
        primary: "authentic",
        secondery: "29 places near you",
      },
    ];
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

    const getFood = await axiosInstance.get(
      "http://localhost:5000/api/food/page",
      {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
          refreshToken: `Bearer ${cookie.refreshToken}`,
        },
      }
    );
    const responseFood = await getFood;

    return {
      props: {
        response,
        restaurant: restaurantResult.data,
        food: responseFood.data,
        imgData: imgData,
        // data: randomData,
      },
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
