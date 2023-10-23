import { useState } from "react";
import styles from "./LogAdmin.module.css";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../../assets/murcielagos.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const defaultData = {
  email: "admin@hotmail.com",
  password: "admin1010",
};

const LogAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "admin",
    email: "",
    password: "",
    role: "admin",
  });

  const handlerChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userData.email === defaultData.email &&
      userData.password === defaultData.password
    ) {
      dispatch(registerUser(userData));

      // Limpia los valores del formulario
      setUserData({
        ...userData,
        email: "",
        password: "",
      });
      navigate("/admin");
    } else {
      toast.error("Wrong email or password", { position: "bottom-center" });
    }
  };

  return (
    <div className={styles.container}>
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
        <Link className={styles.link} to='/signup'><ExitToAppIcon/>Go Back</Link>
      </form>
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
};

export default LogAdmin;
