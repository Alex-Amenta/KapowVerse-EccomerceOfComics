/* eslint-disable no-irregular-whitespace */
import styles from "./Login.module.css";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setRes("Loading...");
		try {
			const res = await axios.post("http://localhost:3000/user/login", data);
			console.log(res.data);
			dispatch({ type: "LOGIN", payload: res.data });
			<Navigate
				to="/app/home"
				replace={true}
			/>;
		} catch (err) {
			console.log(err);
			if (err.response && err.response.data) setRes(err.response.data.message);
			else setRes("Error in server");
		}
	};

	return (
		<div className={styles.container}>
			<h2>LogIn</h2> <hr />
			<h3
				onClick={() => setRes("")}
				style={{
					cursor: "pointer",
					color: "red",
				}}>
				{res ? <>&times; {res} &times;</> : null} 
			</h3>
			<form
				onSubmit={handleSubmit}
				className={styles.form}>
				<label
					htmlFor="email"
					className={styles.label}>
					Email <label style={{ color: "red" }}>*</label>
				</label>
				<input
					type="email"
					id="email"
					value={data.email}
					onChange={handleChange}
					className={styles.input}
				/>
				<label
					htmlFor="password"
					className={styles.label}>
					Password <label style={{ color: "red" }}>*</label>
				</label>
				<input
					type="password"
					id="password"
					value={data.password}
					onChange={handleChange}
					className={styles.input}
				/>
				<button
					type="submit"
					className={styles.submit}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Login;
