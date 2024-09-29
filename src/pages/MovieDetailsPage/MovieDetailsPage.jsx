import {
  NavLink,
  useParams,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import s from "./MovieDetailsPage.module.css";
import { fetchMovieId, fetchCastById } from "../../services/api";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackRef = useRef(location.state);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieId(movieId);
        setMovie(movieData);

        const castData = await fetchCastById(movieId);
        setCast(castData.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const baseUrl = "https://image.tmdb.org/t/p/w500/";
  const posterUrl = movie.poster_path
    ? `${baseUrl}${movie.poster_path.slice(1)}`
    : "";

  return (
    <div className={s.wrapper}>
      {movie && (
        <>
          <div className={s.linkContainer}>
            <Link to={goBackRef.current ?? "/movies"} className={s.link}>
              Go Back
            </Link>
          </div>
          <div className={s.container}>
            <div>
              <img src={posterUrl} alt={movie.title} className={s.img} />
            </div>
            <div>
              <h2 className={s.elem}>{movie.title}</h2>
              <p className={s.elem}>Score: {movie.vote_average}</p>
              <h3 className={s.elem}>Overview</h3>
              <p className={s.elem}>{movie.overview}</p>
              <h3 className={s.elem}>Genres</h3>
              <ul className={s.genres}>
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
              </ul>
              <h3>Year</h3>
              <p>{movie.release_date}</p>
            </div>
          </div>
          <hr />
          <div>
            <h3 className={s.h3}>Additional information</h3>
            <ul className={s.addInfo}>
              <li>
                <NavLink to="cast" className={s.addLink}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={s.addLink}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <Outlet context={{ cast }} />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
