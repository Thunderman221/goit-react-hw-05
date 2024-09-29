import { useState } from "react";
import { Formik, Form, Field } from "formik";
import s from "./MoviesPage.module.css";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const initialValues = {
    query: "",
  };

  const handleSubmit = async (values) => {
    if (!values.query.trim()) {
      setError("Please enter a valid search term.");
      return;
    }

    setLoading(true);
    setError(null);
    setNoResults(false);

    try {
      const data = await fetchMoviesByQuery(values.query);

      if (data.results.length === 0) {
        setNoResults(true);
      } else {
        setMovies(data.results);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
