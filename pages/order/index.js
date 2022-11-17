import Head from "next/head";
import Navbar from "../../components/layout/Navbar";
import Index from "../../components/order/index";

export async function getServerSideProps(context) {
  const cookie = context.req.cookies;
  //fetch metadata
  const fetchMetaData = await fetch(
    "http://localhost:5000/api/meta/by-id?metaId=6",
    {
      method: "GET",
    }
  );
  const response = await fetchMetaData.json();

  return {
    props: {
      meta: response.data,
      accessToken: cookie.accessToken,
      refreshToken: cookie.refreshToken,
    },
  };
}

export default function Account(props) {
  return (
    <>
      <Head>
        <meta name="description" content={props?.meta?.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={props?.meta?.keywords} />
        <meta name="author" content={props?.meta?.author} />
        <title>{props?.meta?.name}</title>
      </Head>
      <Navbar />
      <Index
        accessToken={props.accessToken}
        refreshToken={props.refreshToken}
      />
    </>
  );
}
