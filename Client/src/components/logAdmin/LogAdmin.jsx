import { useEffect, useState } from "react";
import styles from "./LogAdmin.module.css";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { logUserByLocalStorage } from "../../redux/features/userSlice";

const LogAdmin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const userLogState = useSelector((state) => state.user.logState);
	const isAdmin = useSelector((state) => state.user.admin);

	useEffect(() => {
    if (userLogState) { //si el user esta logueado
      if (isAdmin) navigate("/admin"); //y es admin, lo mando a admin 
      else navigate("/home"); //si no, lo mando a home
		}
	}, [userLogState, isAdmin]);
	// useEffect(() => {
	// 		if (localStorage.getItem("userlog")) {
	// 			dispatch(
	// 				logUserByLocalStorage(JSON.parse(localStorage.getItem("userlog")))
	// 			);
	// 		}
	// }, []);

	const handlerChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await dispatch(loginUser(userData))
			.then((res) => {
        console.log("ressssssss", res)
				if (!res.error) {
					toast.success("Logged in successfully!", {
						position: "top-center",
						id: "success",
					});
					localStorage.setItem("userlog", JSON.stringify(res.payload));
					if (res.payload.role === "admin"){
            console.log("navigate adm")}
          // } navigate("/admin");
					else {
            console.log("navigate")
						// navigate("/home");
					}
				} else {
					toast.error(res.payload, {
						position: "top-center",
						id: "error",
					});
					setUserData({
						...userData,
						email: "",
						password: "",
					});
				}
			})
			.catch(() => {
				toast.error("Network error!", {
					position: "top-center",
					id: "error",
				});
			});
	};

	const darkMode = useSelector(selectDarkMode);

	return (
		<div className={darkMode ? styles.container : styles.dark}>
			<form
				onSubmit={handleSubmit}
				className={styles.form}>
				<h2>Welcome Admin!</h2>
				<div className={styles.emailContainer}>
					<label
						className={styles.labels}
						htmlFor="email">
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
					<label
						className={styles.labels}
						htmlFor="password">
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
				<button
					className={styles.buttonLog}
					type="submit">
					Log In
				</button>
				<Link
					className={styles.link}
					to="/signup">
					<ExitToAppIcon />
					Go Back
				</Link>
			</form>
		</div>
	);
};

export default LogAdmin;
