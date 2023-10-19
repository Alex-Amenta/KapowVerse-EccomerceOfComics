import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const Cards = ({
  id,
  title,
  description,
  price,
  category,
  author,
  image,
  stock,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleAddToCart = () => {
    dispatch(addToCart({ userId: user.id, comicId: id }));
  };


  return (
    <main className={styles.container}>
      <div className={styles.cardImage}>
        <Link to={`/comic/${id}`}>
          <img src={image} alt={`imagen de ${title}`} />
        </Link>
      </div>
      <h3>{title}</h3>
      <p>{author}</p>
      <div className={styles.iconsContainer}>
        <b>{price} $</b>
        <div className={styles.icons}>
          <button onClick={handleAddToCart}>
            <ShoppingCartIcon className={styles.icon} />
          </button>
          <button>
            <GradeIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Cards;
