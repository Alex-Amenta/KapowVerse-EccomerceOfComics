/* eslint-disable no-irregular-whitespace */
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleAuth } from "../../redux/features/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import {  toast } from "react-hot-toast";
import Navbar from "../navbar/Navbar";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

function Login() {
  const logState = useSelector((state) => state.user.logState);
  const userActive = useSelector((state) => state.user.user);
  if (logState && userActive && userActive.active !== false) window.location.href = "/home";

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [res, setRes] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    if (res) setRes("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (res) setRes("");
    if (data.email.length < 3) {
      setRes("Email must be at least 3 characters long");
      return;
    } else if (!data.email.includes("@")) {
      setRes("Email must be valid");
      return;
    }
    setRes("Loading...");
    dispatch(loginUser(data))
      .then((res) => {
        if (res.error) {
          setRes(res.payload);
          return;
        }
        if (res.payload.active === false) {
          toast.error("User is not active");
          setRes("User is not active");
          return;
        }
        setRes("Success");
        localStorage.setItem("userlog", JSON.stringify(res.payload)); //TODO agregar userlog
      })
      .catch((err) => {
        if (err.response && err.response.data)
          setRes(err.response.data.message);
        else setRes("Error in server");
      });
  };

  const responseGoogle = async (response) => {
    dispatch(googleAuth(response))
      .then((res) => {
        if (res.error) {
          setRes(res.payload);
          return;
        }
        if (res.payload.active === false) {
          toast.error("User is not active");
          setRes("User is not active");
          return;
        }
        setRes("Success");
        localStorage.setItem("userlog", JSON.stringify(res.payload)); //TODO agregar userlog
      })
      .catch((err) => {
        if (err.response && err.response.data)
          setRes(err.response.data.message);
        else setRes("Error in server");
      });
  };

  const darkMode = useSelector(selectDarkMode);

	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
	  }, [darkMode]);

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h2 style={!darkMode ? { color: "#fcff00" } : null}>LogIn</h2> <hr />
      <h3
        onClick={() => setRes("")}
        style={{
          cursor: "pointer",
          color: "red",
        }}
      >
        {res ? <>&times; {res} &times;</> : null} 
      </h3>
      <form onSubmit={handleSubmit} className={styles.form} style={!darkMode ? {color: "white"} : null}>
        <label htmlFor="email" className={styles.label}>
          Email <label style={{ color: "red" }}>*</label>
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="password" className={styles.label}>
          Password <label style={{ color: "red" }}>*</label>
        </label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.submit}>
          Login
        </button>

        <GoogleLogin
          className={styles.googleButton}
          size="3rem"
          onSuccess={(credentialResponse) => {
            responseGoogle(credentialResponse);
          }}
          onError={() => {
            setRes("Login Failed");
          }}
        />
        <br />
      </form>
    </div>
    </>
  );
}

export default Login;
