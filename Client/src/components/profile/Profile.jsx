import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

function Profile() {
	const user = useSelector((state) => state.user.user);
	console.log(user)

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
