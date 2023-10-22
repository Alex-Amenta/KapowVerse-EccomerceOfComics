import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styles from './PopUpUser.module.css'
import spiderman from "../../../assets/spiderman.png";

const PopUpUser = ({ isOpen, onRequestClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUser = () => {
    dispatch;
    navigate("/home");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Usuario bloqueado"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.contentContainer}>
      <img src={spiderman} alt="" />
        <p>
          Your account has been blocked. You can only access to see the catalog
        </p>
        <button className={styles.button} onClick={handleUser}>
          Accept
        </button>
      </div>
    </Modal>
  );
};

export default PopUpUser;
