import AddFood from '../../components/dashboard/AddFood';
import ViewFood from '../../components/dashboard/ViewFood';
import { getSession } from 'next-auth/react';

export async function getServerSideProps() {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: '/' });
    context.res.end;
    return {};
  }

  let data = await fetch('http://localhost:3000/api/dashboard/view');
  let res = await data.json();
  return {
    props: res,
  };
}

export default function Home(props) {
  return (
    <div className="mx-[100px]">
      <h1 className="mx-auto text-4xl"> dashboard</h1>
      <AddFood />
      <ViewFood data={props} />
    </div>
  );
}
