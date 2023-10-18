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
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearIcon from '@mui/icons-material/Clear';

function Reviews({ comicId }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const user = useSelector((state) => state.user.user);
  const userId = user ? user.id : null;

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    dispatch(fetchReviewByComic(comicId));
  }, [dispatch, comicId]);

  useEffect(() => {
    dispatch(reviewSortRating(sortOrder));
  }, [dispatch, sortOrder]);

  // Ordenar las reseñas por rating (de mayor a menor).
  const sortReviewChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCreateReview = () => {
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
        dispatch(
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

  return (
    <div className={styles.container}>
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
          {reviews.map((review) => (
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
              value={newRating}
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
    </div>
  );
}

export default Reviews;
