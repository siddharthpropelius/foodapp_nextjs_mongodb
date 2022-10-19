import { getSession, useSession, signOut } from 'next-auth/react';
import Image from 'next/future/image';
import Head from 'next/head';
import Navbar from '../../components/layout/Navbar';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  //fetch metadata
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

export default function Account(props) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <meta name="description" content={props?.res?.des} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props?.res?.title}</title>
        <title>Account </title>
      </Head>
      <Navbar />
      <div className="flex justify-center flex-col mx-auto w-full items-center">
        <h5 className="mt-12 text-3xl mb-6">Account Overview</h5>
        <Image
          src={session?.user?.image}
          alt="profile"
          width={200}
          height={200}
          className="rounded-full"
        />
        <p className="mt-12 text-xl">Name: {session?.user?.name}</p>
        <p className="mt-2 text-xl">Email: {session?.user?.email} </p>
        <button
          className="rounded-md bg-[#FFC300] px-3 text-white py-1 mt-2 cursor-pointer"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </>
  );
}
