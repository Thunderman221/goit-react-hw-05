import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./MoviesPage.module.css";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    query: new URLSearchParams(location.search).get("query") || "",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const query = new URLSearchParams(location.search).get("query");
      if (query) {
        setLoading(true);
        setError(null);
        setNoResults(false);

        try {
          const data = await fetchMoviesByQuery(query);
          if (data.results.length === 0) {
            setNoResults(true);
          } else {
            setMovies(data.results);
          }
        } catch (err) {
          setError("An error occurred. Please try again.");
          console.log(`Error: ${err}`);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMovies();
  }, [location.search]);

  const handleSubmit = (values) => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      setError("Please enter a valid search term.");
      return;
    }

    navigate(`?query=${trimmedQuery}`);
  };

  return (
    <div className={s.wrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <Field name="query" placeholder="Search for a movie..." />
          <button type="submit" className={s.btn}>
            Search
          </button>
        </Form>
      </Formik>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {noResults && <p>No results found for your search.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
