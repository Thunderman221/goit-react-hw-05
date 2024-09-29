import s from "./MovieReviews.module.css";
import { fetchReviewsById } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchReviewsById(movieId);
        setReviews(data.results);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!reviews.length) {
    return <h2>Sorry, there are no reviews here.</h2>;
  }

  return (
    <div>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={s.reviewItem}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
