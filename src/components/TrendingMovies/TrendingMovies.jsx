import { useEffect, useState } from "react";
import s from "./TrendingMovies.module.css";
import { fetchMovies } from "../../services/api";
import { Link } from "react-router-dom";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchMovies("/trending/movie/day");
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul className={s.list}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>{" "}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingMovies;
