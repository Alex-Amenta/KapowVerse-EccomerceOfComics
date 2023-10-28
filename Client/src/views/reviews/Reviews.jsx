import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  fetchReviewByComic,
  reviewSortRating,
} from "../../redux/features/reviewSlice";
import styles from "./Reviews.module.css";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import naruto from "../../assets/naruto-alert.png";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import base_url from "../../utils/development";
import { useParams } from "react-router-dom";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

function Reviews() {
  const { id } = useParams();
  const comicId = id;
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user.id : null;

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(fetchReviewByComic(comicId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(reviewSortRating(sortOrder));
  }, [dispatch, sortOrder]);

  // Ordenar las reseñas por rating (de mayor a menor).
  const sortReviewChange = (e) => {
    setSortOrder(e.target.value);
  };

  const checkUserPurchases = async () => {
    try {
      const response = await axios.get(`${base_url}/purchase`);
      const purchases = await response.data;
      return purchases;
    } catch (error) {
      console.error("Error al verificar las compras:", error);
    }
  };

  const handleCreateReview = async () => {
    if (!user) {
      toast.error("You must log in to create a review.", {
        position: "bottom-center",
      });
      setNewRating(0);
      setNewComment("");
      return;
    }

    // Verifica si el usuario ha realizado compras
    const userPurchases = await checkUserPurchases();

    if (!userPurchases || userPurchases.length === 0) {
      toast.error("You must make a purchase to leave a review.", {
        position: "bottom-center",
      });
      return;
    }

    if (newRating >= 1 && newRating <= 5) {
      // Verificar si el usuario ya ha creado una review de este cómic
      const hasReviewed = reviews.some((review) => review.user?.id === userId);

      if (hasReviewed) {
        toast.error("You have already reviewed this comic", {
          position: "bottom-center",
        });
        setNewRating(0);
        setNewComment("");
      } else {
        await dispatch(
          createReview({
            rating: newRating,
            comment: newComment,
            userId,
            comicId,
          })
        );
        toast.success("Review added successfully", {
          position: "bottom-center",
        });
        setNewRating(0);
        setNewComment("");
      }
    } else {
      toast.error("Please complete all fields!", {
        position: "bottom-center",
      });
    }
  };

  const darkMode = useSelector(selectDarkMode);
  
  return (
    <div className={darkMode ? styles.container : styles.dark}>
      <h2>Reviews and ratings</h2>
      {reviews.length === 0 ? (
        <div className={styles.notReview}>
          <img src={naruto} alt="" />
          <p className={styles.textNotReview}>
            No reviews available yet. Be the first to create a review!
          </p>
          <hr />
        </div>
      ) : (
        <div className={styles.reviewsContainer}>
          {reviews.length > 1 && (
            <div className={styles.filterContainer}>
              <select value={sortOrder} onChange={sortReviewChange}>
                <option value="">Sort By</option>
                <option value="desc">Highest Rated</option>
                <option value="asc">Lowest Rated</option>
              </select>
            </div>
          )}
          {reviews?.map((review) => (
            <div key={review.id} className={styles.reviewUsers}>
              <div className={styles.userAvatar}>
                <img
                  src={review.user?.image}
                  alt={`${review.user?.name}'s avatar`}
                />
                <p>{review.user?.name}</p>
              </div>
              <Rating name="read-only" value={review.rating} readOnly />
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      <section className={styles.createReview}>
        <h3>Create a Review</h3>
        <div className={styles.formulario}>
          <div className={styles.rating}>
            <Typography component="legend">Rating:</Typography>
            <Rating
              name="simple-controlled"
              value={Number(newRating)}
              onChange={(e) => setNewRating(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Your opinion about this comic..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>

        <button onClick={handleCreateReview}>Send Review</button>
      </section>
    </div>
  );
}

export default Reviews;
