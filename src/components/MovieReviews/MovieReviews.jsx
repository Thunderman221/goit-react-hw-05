import s from "./MovieReviews.module.css";
import { fetchReviewsById } from "../../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchReviewsById(movieId);
      setReviews(data);
    };
    getData();
  }, [movieId]);
  if (!reviews.length) {
    return <h2>There are no reviews here</h2>;
  }

  return (
    <div>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review.id}>{review.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
