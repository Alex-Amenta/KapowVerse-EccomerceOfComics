import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchComicDetail } from "../../redux/features/comicSlice";
import styles from "./Detail.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";

function Detail() {
  const dispatch = useDispatch();
  const comics = useSelector((state) => state.comic.comicDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchComicDetail(id));
  }, [dispatch, id]);

  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={comics.image} alt={`Imagen de ${comics.title}`} />
      </div>
      <div className={styles.content}>
        <h1>{comics.title}</h1>
        <h3>{comics.author}</h3>
        <p>
          Stock Available: <b>{comics.stock}</b>
        </p>
        <h3 className={styles.price}>{comics.price} $</h3>
        <hr />
        <div className={styles.descriptionContainer}>
          <h4>Description:</h4>
          <p>{comics.description}</p>
          <p>
            Category: <b>{comics.category}</b>
          </p>

          <p>
            Publisher: <b>{comics.publisher}</b>
          </p>
        </div>
        <div className={styles.containerButtons}>
          <button>
            Add to Cart <AddShoppingCartIcon className={styles.icons} />
          </button>
          <button>
            Add to Favorites <StarIcon color="secondary" className={styles.icons} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Detail;
