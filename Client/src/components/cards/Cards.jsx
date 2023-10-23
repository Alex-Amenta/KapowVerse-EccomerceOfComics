import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToCart } from "../../redux/features/cartSlice";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";

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
	const cart = useSelector((state) => state.cart.cart);
	const items = useSelector((state) => state.comic.allComics);

	// const handleAddToCart = () => {
	//   dispatch(addToCart({ userId: user.id, comicId: id }));
	// };

  const addToCart = () => {
    const checkStock = items.find((item) => item.id === id);
    let checkCart = cart.find((item) => item.id === id);
    if (
      (!checkCart && checkStock.stock === 0) ||
      checkCart?.quantity === checkStock.stock
    )
      return toast.error(
        "You have selected the maximum number of products in stock",
        {
          position: "bottom-center",
        }
      );
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
    return toast.success("Item added to cart!", { position: "bottom-center" });
  };

	return (
		<main className={styles.container}>
			<div className={styles.cardImage}>
				<Link to={`/comic/${id}`}>
					<img
						src={image}
						alt={`imagen de ${title}`}
					/>
				</Link>
			</div>
			<h3>{title}</h3>
			<p>{author}</p>
			<div className={styles.iconsContainer}>
				<b>{price} $</b>
				<div className={styles.icons}>
					<button onClick={addToCart}>
						<ShoppingCartIcon className={styles.icon} />
					</button>
					<button>
						<GradeIcon className={styles.starIcon} />
					</button>
				</div>
			</div>
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
		</main>
	);
};

export default Cards;
