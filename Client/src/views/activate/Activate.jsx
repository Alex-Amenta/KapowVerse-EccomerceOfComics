import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../../utils/development";
import { toast } from "react-hot-toast";
import styles from "./Activate.module.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";

function Activate() {
	const { token } = useParams();
	const [input, setInput] = useState(token || "");

	const activateAccount = async () => {
		try {
			await axios
				.post(`${base_url}/user/verify/${input}`)
				.then((res) => {
					toast.success(res.data.message + " Redirecting...", {
						duration: 2000,
						position: "top-center",
						id: "activate",
					});
					const newUser = JSON.parse(localStorage.getItem("userlog"));
					if (newUser) {
						newUser.active = true;
						localStorage.setItem("userlog", JSON.stringify(newUser));
					} else {
						localStorage.setItem(
							"userlog",
							JSON.stringify({ ...res.data.user, active: true })
						);
					}

					setTimeout(() => {
						window.location = "/home";
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.response ? err.response.data.message : err.message, {
						duration: 4000,
						position: "top-center",
						id: "error",
					});
				});
		} catch (err) {
			console.log("catch", err);
			toast.error(err.response ? err.response.data.message : err.message, {
				duration: 4000,
				position: "top-center",
				id: "error",
			});
		}
	};
	if (token) activateAccount();

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	return (
		<>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.text}>
					Paste the code sent to your email here and press the button to
					Activate your account:{" "}
				</div>
				<input
					className={styles.input}
					value={input}
					onChange={handleInputChange}
					type="text"
				/>
				<button onClick={activateAccount}>Activate</button>
			</div>
		</>
	);
}

export default Activate;
