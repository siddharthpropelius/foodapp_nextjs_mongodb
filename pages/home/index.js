import HeaderCard from '../../components/home/HeaderCard';
import Hero from '../../components/home/Hero';
import NavBar from '../../components/layout/Navbar';
import PopularRecipes from '../../components/home/PopularRecipes';
import PosterContainer from '../../components/home/PosterContainer';
import Head from 'next/head';
import axiosInstance from '../../utils/axiosInstance';

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.cookies;
    const fetchMetaData = await fetch(
      'http://localhost:5000/api/meta/by-id?metaId=1',
      {
        method: 'GET',
      }
    );
    const response = await fetchMetaData.json();

    const getCategory = await axiosInstance.get(
      'http://localhost:5000/api/category/',
      {
        headers: {
          Authorization: `Bearer ${cookie.accessToken}`,
          refreshToken: `Bearer ${cookie.refreshToken}`,
        },
      }
    );
    const responseCategory = await getCategory;
    return {
      props: { meta: response.data, category: responseCategory.data },
    };
  } catch (err) {
    const error = err;
    console.log(error);
    return {
      props: {},
    };
  }
}

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <Head>
        <meta name="description" content={props?.meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.meta?.keywords} />
        <meta name="author" content={props?.meta?.author} />
        <title>{props?.meta?.name}</title>
      </Head>
      <NavBar />
      <Hero />
      <HeaderCard />
      <PopularRecipes category={props.category} />
      <PosterContainer />
    </div>
  );
}
