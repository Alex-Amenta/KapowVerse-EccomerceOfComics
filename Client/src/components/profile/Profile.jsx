import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { deleteAccount, logUserByLocalStorage } from "../../redux/features/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import base_url from "../../utils/development";


function Profile() {
  if (!localStorage.getItem("userlog")) {
    window.location.href = "/login";
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userlog")) {
      dispatch(logUserByLocalStorage(JSON.parse(localStorage.getItem("userlog"))));
    }
  }, []);

  let user = useSelector((state) => state.user.user);
  if (localStorage.getItem("userlog") !== null && user === null) {
    user = JSON.parse(localStorage.getItem("userlog"));
  }

  const handleDelete = (userId) => {
    toast(
      <div className={styles.containerToast}>
        <p>&#128680; You are about to delete your account, are you sure?</p>
        <div className={styles.toastButtons}>
          <button
            onClick={() => {
              dispatch(deleteAccount(userId));
              localStorage.removeItem("userlog");
              toast.dismiss();
              window.location.href = "/home";
            }}
          >
            Accept
          </button>
          <button onClick={() => toast.dismiss()}>Cancel</button>
        </div>
      </div>,
      { duration: 20000 }
    );
  };

  const handleResend = async () => {
    try {
      await axios
        .post(`${base_url}/user/resend/${user.id}`)
        .then((res) => {
          toast.success(res.data.message, {
            duration: 4000,
            position: "top-center",
            id: "success",
          });
        })
        .catch((err) => {
          toast.error(err.response ? err.response.data.message : err.message, {
            duration: 4000,
            position: "top-center",
            id: "error",
          });
        });
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message, {
        duration: 4000,
        position: "top-center",
        id: "error",
      });
    }
  };

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);
  console.log(user.verified)
  return (
    <>
      <Navbar />
      <div className={darkMode ? styles.container : styles.dark}>
        <h2>Profile</h2> <hr />
        <div className={styles.profileContainer}>
          <div className={styles.profileImageContainer}>
            <img
              className={styles.profileImage}
              src={user.image}
              alt={user.name}
            />
          </div>
          <div className={styles.profileInfoContainer}>
            <h3>
              Name: <span>{user.name}</span>
            </h3>
            <h3>
              Email: <span>{user.email}</span>
            </h3>
            <h3>
              Account State: <span>{user.verified ? "Verified" : "Not Verified"}</span>
            </h3>
            {!user.verified ? <button className={styles.verifyButton} onClick={handleResend}>Resend verification Email</button> : null}
            <div className={styles.profileButtonsContainer}>
              <Link to={`/edit/${user.id}`} className={styles.profileButton}>
                Edit Profile
              </Link>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(user.id)}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
