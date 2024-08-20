import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	fetchComicDetail,
	fetchComicsRelated,
	resetDetails,
} from "../../redux/features/comicSlice";
import styles from "./Detail.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Reviews from "../reviews/Reviews";
import { addItemToCart } from "../../redux/features/cartSlice";
import { toast } from "react-hot-toast";
import Navbar from "../../components/navbar/Navbar";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import {
	createFavorites,
	fetchFavoritesByUser,
} from "../../redux/features/favoriteSlice";
import { useSearchParams } from "react-router-dom";
import ImageWithPlaceholder from "../../utils/ImageWithPlaceholder";

function Detail() {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const favorites = useSelector((state) => state.favorite.favorites);
	useSelector((state) => state.review.reviews);
	const comicsRelated = useSelector((state) => state.comic.relatedComics);
	const user = useSelector((state) => state.user.user);
	const darkMode = useSelector(selectDarkMode);
	const [response, setResponse] = useState("pending");
	const cart = useSelector((state) => state.cart.cart);
	const items = useSelector((state) => state.comic.allComics);
  const imgContainerRef = useRef(null);
  const algoRef = useRef(null);
	const [comics, setComics] = useState({
		title: "",
		image: "",
		author: "",
		stock: 0,
		price: 0,
		description: "",
		categories: [],
		publisher: "",
	});

	useEffect(() => {
		const scrollTo = searchParams.get("scrollTo");
		if (scrollTo === "reviews") {
			const reviewsSection = document.getElementById("reviews");
			if (reviewsSection) {
				reviewsSection.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [searchParams]); // La dependencia asegura que el efecto se ejecute cuando cambien los searchParams

	useEffect(() => {
		dispatch(fetchComicDetail(id)).then((data) => {
			setComics(data.payload);
			setResponse("fulfilled");
		});
		dispatch(fetchComicsRelated(id));
	}, [response, id]);

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
	}, [darkMode]);

  useEffect(() => {
    

    function rotateImage(e) {
      const elem = imgContainerRef.current;
      if (elem) {
        // Get the x and y positions of the mouse relative to the center of the image
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
  
        // Calculate rotation values based on mouse position and a rotation factor
        const rotationFactor = 0.05; // Adjust this to make the effect more or less pronounced
        const rotateX = -y * rotationFactor;
        const rotateY = x * rotationFactor;
        // console.log("rotateX: ", rotateX, "rotateY: ", rotateY)
        // Apply the rotation effect to the image
        elem.style.boxShadow = `${-x/5}px ${y/10}px 100px rgba(0, 0, 0, 0.5)`;
        elem.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

    }

    function dos(event){
      const alpha = event.alpha;
      const beta = event.beta; // y
      const gamma = event.gamma; // x
      algoRef.current.innerHTML = `alpha: ${alpha.toFixed(2)}<br>beta: ${beta.toFixed(2)}<br>gamma: ${gamma.toFixed(2)}`;
      // console.log("alpha: ", alpha, "beta: ", beta, "gamma: ", gamma);
      const elem = imgContainerRef.current;
      if (elem) {

        // Apply the rotation effect to the image
        elem.style.boxShadow = `${-gamma/5}px ${beta/10}px 100px rgba(0, 0, 0, 0.5)`;
        elem.style.transform = `rotateX(${-beta}deg) rotateY(${gamma}deg)`;
      }

    }

    window.addEventListener('deviceorientation', dos)

    document.addEventListener("mousemove", rotateImage);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", rotateImage);
      window.removeEventListener('deviceorientation', dos);
    };
  }, []);


	if (response == "fulfilled" && comics.length == 0) {
		setResponse("rejected");
	}

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleAddToCart = () => {
		const comic = items.find((item) => item.id === id);
		const cartItem = cart.find((item) => item.id === id);

		if (!comic || (cartItem && cartItem.quantity === comic.stock)) {
			toast.error("Item out of stock or maximum quantity reached", {
				position: "bottom-center",
			});
			return;
		}

		if (cartItem) {
			toast.error("Item is already in the cart", {
				position: "bottom-center",
				id: "error",
			});
		} else {
			dispatch(addItemToCart(comic));
			toast.success("Item added to cart!", { position: "bottom-center" });
		}
	};

	const handleAddFavorite = () => {
		if (!user) {
			toast.error("You must be logged in to add a favorite", {
				position: "bottom-center",
				id: "error",
			});
			return;
		}

		dispatch(createFavorites({ userId: user.id, comicId: id }))
			.then((res) => {
				if (res.error) {
					toast.error(res.payload ? res.payload.message : res.error.message, {
						position: "bottom-center",
						id: "error",
					});
					return;
				}
				dispatch(fetchFavoritesByUser(user.id));
				toast.success("Item saved in favorites!", {
					position: "bottom-center",
					icon: "🌟",
				});
			})
			.catch((error) => {
				toast.error(
					error.response ? error.response.data.message : error.message,
					{
						duration: 4000,
						position: "top-center",
						id: "error",
					}
				);
			});
	};

	return (
		<>
			<Navbar />
      <span ref={algoRef}></span>
			<section className={darkMode ? styles.light : styles.dark}>
				<div className={styles.buttonBack}>
					<button onClick={handleGoBack}>
						<ArrowBackIcon fontSize="large" />
					</button>
				</div>
				<article className={styles.container}>
        <div className={styles.imageContainer} >
						{/* <img src={comics.image} alt={`Imagen de ${comics.title}`} /> */}
						<ImageWithPlaceholder
							highResImageSrc={comics.image}
							alt={`imagen de ${comics.title}`}
              ref={imgContainerRef}
						/>
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
								Category:{" "}
								<b>
									{comics.categories?.length > 0 ? (
										comics.categories.map((category, index) => (
											<span key={category.id}>
												{index > 0 && " | "}
												{category.name}
											</span>
										))
									) : (
										<span>Does not have categories</span>
									)}
								</b>
							</p>

							<p>
								Publisher: <b>{comics.publisher}</b>
							</p>
						</div>
						<div className={styles.containerButtons}>
							<button onClick={handleAddToCart}>
								Add to Cart <AddShoppingCartIcon className={styles.icons} />
							</button>
							<button
								onClick={handleAddFavorite}
								disabled={favorites.some((favorite) => favorite.id === id)}>
								Add to Favorites{" "}
								<StarIcon
									color="secondary"
									className={styles.icons}
								/>
							</button>
						</div>
					</div>
				</article>
				{comicsRelated.length > 0 && (
					<article className={styles.relatedsContainer}>
						<h2>Related Comics</h2>
						<div className={styles.comicsRelated}>
							{comicsRelated.map((relatedComic) => (
								<div
									className={styles.card}
									key={relatedComic.id}>
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

				<article
					className={styles.reviewContainer}
					id="reviews">
					<Reviews />
				</article>
			</section>
		</>
	);
}

export default Detail;
