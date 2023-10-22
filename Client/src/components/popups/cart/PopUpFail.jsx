import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styles from "./PopUpFail.module.css";
import spiderman from "../../../assets/spiderman.png";

const PopUpFail = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    navigate("/home");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Compra Rechazada"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <section className={styles.mainContainer}>
        <img src={spiderman} alt="" />
        <div className={styles.info}>
          <h1>Ops... a problem occurred</h1>
        </div>
          <p className={styles.errormsg}>
            A problem occurred while the payment was being processed
          </p>
          <button className={styles.button} onClick={handleAccept}>
            Accept
          </button>
      </section>
    </Modal>
  );
};

export default PopUpFail;
