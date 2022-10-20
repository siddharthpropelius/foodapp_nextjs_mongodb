import HeaderCard from '../../components/home/HeaderCard';
import Hero from '../../components/home/Hero';
import NavBar from '../../components/layout/Navbar';
import PopularRecipes from '../../components/home/PopularRecipes';
import PosterContainer from '../../components/home/PosterContainer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }
  const url = context.req.url;
  const finalURL = url.substring(1);
  const fetchMetaData = await fetch('http://localhost:3000/api/metadata', {
    method: 'POST',
    body: finalURL,
  });
  const response = await fetchMetaData.json();


  return {
    props: { res: response.res[0] },
  };
}

export default function Home(props) {
  const data = useSelector((state) => state.slice.cart);
  const handleOnAdd = () => {
    axios.post('/api/cart/add', { data }).then((res) => {});
  };
  return (
    <div>
      <Head>
        <meta name="description" content={props?.res?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.res?.title}</title>
        {/* <title>Home</title> */}
      </Head>
      <NavBar />
      <Hero />
      <HeaderCard />
      <PopularRecipes handler={handleOnAdd} />
      <PosterContainer />
    </div>
  );
}
