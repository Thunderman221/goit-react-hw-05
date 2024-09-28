import TrendingMovies from "../../components/TrendingMovies/TrendingMovies";
import s from "./HomePage.module.css";

const Home = () => {
  return (
    <div className={s.wrapper}>
      <h2>Trending today</h2>
      <TrendingMovies />
    </div>
  );
};
export default Home;
