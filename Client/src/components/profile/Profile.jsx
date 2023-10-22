import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { logUserByLocalStorage } from "../../redux/features/userSlice";
import { useEffect } from "react";

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
		</div>
	);
}

export default Profile;
