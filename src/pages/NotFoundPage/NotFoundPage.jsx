import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";
const NotFound = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.h1}>Page is not found...</h1>
      <Link to="/" className={s.link}>
        Home
      </Link>
    </div>
  );
};

export default NotFound;
