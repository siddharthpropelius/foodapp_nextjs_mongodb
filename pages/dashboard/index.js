import AddFood from '../../components/dashboard/AddFood';
import ViewFood from '../../components/dashboard/ViewFood';

export async function getServerSideProps() {
  let data = await fetch('http://localhost:3000/api/dashboard/view');
  let res = await data.json();
  return {
    props: res,
  };
}

export default function Home(props) {
  // console.log('PROPS::::::::::::', props.res);
  return (
    <div className="mx-[100px]">
      <h1 className="mx-auto text-4xl"> dashboard</h1>
      <AddFood />
      <ViewFood data={props} />
    </div>
  );
}
