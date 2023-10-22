import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/features/cartSlice";
import Modal from "react-modal";
import styles from "./PopUpSucces.module.css";
import spiderman from "../../../assets/spiderman.png";

const PopUpSuccess = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(clearCart());
    navigate("/home");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Compra Exitosa"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <section className={styles.mainContainer}>
        <img src={spiderman} alt="" />
        <div className={styles.thanks}>
          <h1>Thank you for shopping at KapowVerse</h1>
        </div>
        <p>Your purchase was made successfully!</p>
        <button className={styles.button} onClick={handleAccept}>
          Accept
        </button>
      </section>
    </Modal>
  );
};

export default PopUpSuccess;
