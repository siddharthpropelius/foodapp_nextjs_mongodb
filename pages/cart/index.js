import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';
import Index from '../../components/cart/index';

export async function getServerSideProps(context) {
  // fetch metadata
  const fetchMetaData = await fetch(
    'http://localhost:5000/api/meta/by-id?metaId=5'
  );
  const response = await fetchMetaData.json();

  return {
    props: { response },
  };
}

export default function Account(props) {
  return (
    <>
      <Head>
        <meta name="description" content={props?.response?.data?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content={props?.response?.data?.author} />
        <title>{props?.response?.data?.name}</title>
      </Head>
      <Navbar />
      <Index />
    </>
  );
}
