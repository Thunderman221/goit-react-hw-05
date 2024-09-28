// MovieCast.jsx
import { useOutletContext } from "react-router-dom";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { cast } = useOutletContext();
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <div>
      <h3>Cast</h3>
      <ul className={s.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.castItem}>
            {actor.profile_path && (
              <img
                src={`${baseUrl}${actor.profile_path}`}
                alt={actor.name}
                className={s.castImg}
              />
            )}
            <p>{actor.name}</p>
            <p>Role: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
