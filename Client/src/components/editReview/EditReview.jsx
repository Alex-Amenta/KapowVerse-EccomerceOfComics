import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import { updateReview } from "../../redux/features/reviewSlice";
import { useDispatch } from "react-redux";
import styles from "./EditReview.module.css";
import back_url from "../../utils/development";
import axios from "axios";

function EditReviewModal({ open, onClose, review }) {
  const dispatch = useDispatch();

  const [reviewData, setReviewData] = useState({
    rating: review.rating,
    comment: review.comment,
  });

  const handleEditReview = async () => {
    const reviewEditing = {
      rating: reviewData.rating,
      comment: reviewData.comment,
    };

    await dispatch(
      updateReview({ reviewId: review.id, editReview: reviewEditing })
    )
      .then(() => {
        toast.success("Review edited successfully", {
          position: "bottom-center",
        });
        onClose();
      })
      .catch((error) => {
        toast.error("Failed to edit review: " + error.message, {
          position: "bottom-center",
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.modal}>
      <section className={styles.createReview}>
        <h3>Update Review</h3>
        <div className={styles.formulario}>
          <div className={styles.rating}>
            <Typography component="legend" className={styles.rating}>
              Rating:
            </Typography>
            <Rating
              name="rating"
              value={Number(reviewData.rating)}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="comment"
            placeholder="Your opinion about this comic..."
            value={reviewData.comment}
            onChange={handleChange}
          />
        </div>

        <button onClick={handleEditReview}>Save changes</button>
      </section>
    </Modal>
  );
}

export default EditReviewModal;
