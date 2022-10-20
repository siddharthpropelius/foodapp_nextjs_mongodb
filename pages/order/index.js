import { getSession, useSession } from 'next-auth/react';
import Navbar from '../../components/layout/Navbar';
import Index from '../../components/order/index';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  //fetching order items from server

  const fetchOrders = await fetch('http://localhost:3000/api/order/get', {
    method: 'POST',
    body: session.user.email,
  });
  const order = await fetchOrders.json();
  return {
    props: { order: order },
  };
}

export default function Account(props) {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <Index orders={props.order} />
    </>
  );
}
