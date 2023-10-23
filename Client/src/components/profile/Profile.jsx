import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { logUserByLocalStorage } from "../../redux/features/userSlice";
import { useEffect } from "react";
import axios from "axios";
import base_url from "../../utils/development";
import { Link } from "react-router-dom";

function Profile() {
	if (!localStorage.getItem("token")) {
		window.location.href = "/login";
	}
	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem("token")) {
			dispatch(
				logUserByLocalStorage(JSON.parse(localStorage.getItem("token")))
			);
		}
	}, []);

	let user = useSelector((state) => state.user.user);
	if (localStorage.getItem("token") !== null && user === null) {
		user = JSON.parse(localStorage.getItem("token"));
	}

	const handleDelete = (userId) => {
		axios.delete(`${base_url}/user/${userId}`, { activate: false }).then(() => {
			localStorage.removeItem("token");
			window.location.href = "/home";
		});
	};

	return (
		<div className={styles.container}>
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
					<h3>Name: {user.name}</h3>
					<h3>Email: {user.email}</h3>
				</div>
			</div>
			<div className={styles.profileButtonsContainer}>
				<Link to={`/edit/${user.id}`}
					className={styles.profileButton}
				>
					Edit Profile
				</Link>
				<button
					className={styles.deleteButton}
					onClick={() => handleDelete(user.id)}>
					Delete Profile
				</button>
			</div>
		</div>
	);
}

export default Profile;
