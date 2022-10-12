import HeaderCard from '../../components/home/HeaderCard';
import Hero from '../../components/home/Hero';
import NavBar from '../../components/layout/Navbar';
import PopularRecipes from '../../components/home/PopularRecipes';
import PosterContainer from '../../components/home/PosterContainer';

export default function Home() {
  return (
    <div>
      <NavBar />
      <Hero />
      <HeaderCard />
      <PopularRecipes />
      <PosterContainer />
    </div>
  );
}
