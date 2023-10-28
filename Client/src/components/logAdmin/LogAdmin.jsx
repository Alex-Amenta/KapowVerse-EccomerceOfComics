import { useEffect, useState } from "react";
import styles from "./LogAdmin.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, loginUser } from "../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

const LogAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handlerChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(userData));

    // Limpia los valores del formulario
    setUserData({
      ...userData,
      email: "",
      password: "",
    });
    navigate("/admin");
  };

  useEffect(() => {
  dispatch(fetchUsers());
  }, [dispatch])

  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={darkMode ? styles.container : styles.dark}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Welcome Admin!</h2>
        <div className={styles.emailContainer}>
          <label className={styles.labels} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.Inputs}
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handlerChange}
            required
          />
        </div>
        <div className={styles.passwordContainer}>
          <label className={styles.labels} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.Inputs}
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handlerChange}
            required
          />
        </div>
        <button className={styles.buttonLog} type="submit">
          Log In
        </button>
        <Link className={styles.link} to="/signup">
          <ExitToAppIcon />
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default LogAdmin;
