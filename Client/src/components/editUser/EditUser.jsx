/* eslint-disable no-irregular-whitespace */
import { useEffect, useState } from "react";
import styles from "./EditUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../../redux/features/userSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

function SignUp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userlog")) {
      dispatch(loginUser(JSON.parse(localStorage.getItem("userlog"))));
    }
  }, []);
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    password: "",
    image: "",
  });
  const [res, setRes] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    if (error.name && e.target.id == "name") setError({ ...error, name: "" });
    if (error.email && e.target.id == "email")
      setError({ ...error, email: "" });
    if (error.password && e.target.id == "password")
      setError({ ...error, password: "" });
    if (error.image && e.target.id == "image")
      setError({ ...error, image: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ############### VALIDACIONES ###############
    let err = false;
    let errores = {
      name: "",
      email: "",
      password: "",
      image: "",
    };
    // NAME
    if (data.name.length < 3) {
      errores.name = "× Name must be at least 3 characters long ×";
      err = true;
    }
    // ############## EMAIL
    if (data.email.length < 3) {
      errores.email = "× Email must be at least 3 characters long ×";
      err = true;
    } else if (!data.email.includes("@")) {
      errores.email = "× Email must be valid ×";
      err = true;
    }
    // ################# PASSWORD
    if (data.password != "") {
      if (!data.password.match(/[0-9]/g)) {
        errores.password = "× Password must contain at least 1 number ×";
        err = true;
      } else if (!data.password.match(/[A-Z]/g)) {
        errores.password =
          "× Password must contain at least 1 uppercase letter ×";
        err = true;
      }
    }
    // ################# IMAGE
    if (data.image != "") {
      if (!data.image.includes("http")) {
        errores.image = "× Image must be a valid URL ×";
        err = true;
      }
    }

    setError({ ...errores });
    if (err) return;
    // ############### FIN DE VALIDACIONES ###############
    setRes("Updating user...");
    // ############### POSTEO ###############
    dispatch(updateUser({ data: data, userId: id }))
      .then((res) => {
        if (res.error) {
          setRes("Error updating user");
          return;
        }
        localStorage.setItem("userlog", JSON.stringify(res.payload)); //TODO agregar userlog
        setRes("User updated successfully!");
      })
      .catch((err) => {
        if (err.response && err.response.data)
          setRes(err.response.data.message);
        else setRes("Error in server");
      });

    // ############### FIN DE POSTEO ###############
  };

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonBack}>
        <button onClick={handleGoBack}>
          <ArrowBackIcon fontSize="large" style={darkMode ? {color: "black"} : {color: "white"}}/>
        </button>
      </div>
      <h2 style={darkMode ? {color: "#9f2d1c"} : {color: "#fcff00"}}>Edit Profile</h2> <hr />
      <h3
        onClick={() => setRes("")}
        style={{
          cursor: "pointer",
          color: res.slice(0, 1) === "U" ? "green" : "red",
        }}
      >
        {res ? <>&times; {res} &times;</> : null} 
      </h3>
      <form onSubmit={handleSubmit} className={styles.form} style={darkMode ? {color: "black"} : {color: "white"}}>
        <div className={styles.input__group}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={handleChange}
            className={`${styles.input} ${
              error.name ? styles["input-error"] : ""
            }`}
          />
          <span className={styles.tooltiptext}>At least 3 charcaters</span>
          {error.name ? (
            <span
              onClick={() => setError({ ...error, name: "" })}
              className={styles.tooltip}
            >
              {error.name}
            </span>
          ) : null}
        </div>
        <div className={styles.input__group}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            className={`${styles.input} ${
              error.email ? styles["input-error"] : ""
            }`}
          />
          <span className={styles.tooltiptext}>It should be a valid email</span>
          {error.email ? (
            <span
              onClick={() => setError({ ...error, email: "" })}
              className={styles.tooltip}
            >
              {error.email}
            </span>
          ) : null}
        </div>
        <div className={styles.input__group}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            className={`${styles.input} ${
              error.password ? styles["input-error"] : ""
            }`}
          />
          <span className={styles.tooltiptext}>
            At least 3 characters, 1 uppercase and 1 number
          </span>
          {error.password ? (
            <span
              onClick={() => setError({ ...error, password: "" })}
              className={styles.tooltip}
            >
              {error.password}
            </span>
          ) : null}
        </div>
        <div className={styles.input__group}>
          <label htmlFor="image" className={styles.label}>
            Image
          </label>
          <input
            type="text"
            id="image"
            onChange={handleChange}
            className={`${styles.input} ${
              error.image ? styles["input-error"] : ""
            }`}
          />
          <span className={styles.tooltiptext}>It should be an url</span>
          {error.image ? (
            <span
              onClick={() => setError({ ...error, image: "" })}
              className={styles.tooltip}
            >
              {error.image}
            </span>
          ) : null}
        </div>
        <button type="submit" className={styles.submit}>
          Update
        </button>
      </form>
    </div>
  );
}

export default SignUp;
