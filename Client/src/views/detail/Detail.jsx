import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchComicDetail,
  fetchComicsRelated,
} from "../../redux/features/comicSlice";
import styles from "./Detail.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Reviews from "../reviews/Reviews";
import { addItemToCart } from "../../redux/features/cartSlice";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";
import Navbar from "../../components/navbar/Navbar";

function Detail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comics = useSelector((state) => state.comic.comicDetails);
  useSelector((state) => state.review.reviews);
  const comicsRelated = useSelector((state) => state.comic.relatedComics);
  const { id } = useParams();
  const [response, setResponse] = useState("pending");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchComicDetail(id)).then(() => {
      setResponse("fulfilled");
    });
    dispatch(fetchComicsRelated(id));
  }, [response, id]);


  if (response == "fulfilled" && comics.length == 0) {

    setResponse("rejected")
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    const { id, title, description, price, category, author, image, stock } =
      comics;
    dispatch(
      addItemToCart({
        id,
        title,
        description,
        price,
        category,
        author,
        image,
        stock,
      })
    );
    toast.success("Item added to cart successfully!", {
      position: "bottom-center",
    });
  };

  return (
    <>
    <Navbar/>
    <section>
      <div className={styles.buttonBack}>
        <button onClick={handleGoBack}>
          <ArrowBackIcon fontSize="large" />
        </button>
      </div>
      <article className={styles.container}>
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
            <button onClick={handleAddToCart}>
              Add to Cart <AddShoppingCartIcon className={styles.icons} />
            </button>
            <button>
              Add to Favorites{" "}
              <StarIcon color="secondary" className={styles.icons} />
            </button>
          </div>
        </div>
      </article>
      {comicsRelated.length > 0 && (
        <article className={styles.relatedsContainer}>
          <h2>Related Comics</h2>
          <div className={styles.comicsRelated}>
            {comicsRelated.map((relatedComic) => (
              <div className={styles.card} key={relatedComic.id}>
                <Link to={`/comic/${relatedComic.id}`}>
                  <img
                    src={relatedComic.image}
                    alt={relatedComic.title}
                    title={relatedComic.title}
                  />
                </Link>
              </div>
            ))}
          </div>
        </article>
      )}

        <article className={styles.reviewContainer}>
          <Reviews />
        </article>

      <Toaster
        toastOptions={{
          style: {
            border: "2px solid #000000",
            fontWeight: "bold",
            fontFamily: "Rubik, sans-serif",
            backgroundImage: `url(${imageAlert})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          },
        }}
      />
    </section>
    </>
  );
}

export default Detail;
