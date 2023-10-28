import { useEffect, useState } from "react";
import NavbarAdmin from "../navbar/NavbarAdmin";
import styles from "./UserList.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchUsers,
	toggleUserActiveStatus,
} from "../../../redux/features/userSlice";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
import RestoreIcon from "@mui/icons-material/Restore";
import UserSearch from "../userSearch/UserSearch";
import { toast } from "react-hot-toast";

const UserList = () => {
	const dispatch = useDispatch();
	const allUsers = useSelector((state) => state.user.allUsers);

	const handleToggleStatus = (userId, isActive) => {
		const message = isActive ? "inactive" : "active";

		toast(
			<div className={styles.containerToast}>
				<p>Are you sure you want to mark as {message}?</p>
				<div className={styles.toastButtons}>
					<button
						onClick={() => {
							dispatch(toggleUserActiveStatus(userId));
							toast.dismiss();
							toast.success(`User marked as ${message} successfully`, {
								position: "top-center",
								duration: 0,
							});
						}}>
						Accept
					</button>
					<button onClick={() => toast.dismiss()}>Cancel</button>
				</div>
			</div>,
			{ duration: 20000 }
		);
	};

	return (
		<section className={styles.container}>
			<div className={styles.navbar}>
				<NavbarAdmin />
			</div>
			<div className={styles.content}>
				<div className={styles.titleSearch}>
					<h1 className={styles.title}>List of Users</h1>
					<UserSearch />
				</div>
				<TableContainer
					component={Paper}
					className={styles.tableContainer}>
					<Table>
						<TableHead className={styles.tableHead}>
							<TableRow>
								<TableCell>Image</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>State</TableCell>
								<TableCell>Edit</TableCell>
								<TableCell>Block user</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<img
											src={user.image}
											alt={`image of ${user.name}`}
											width={50}
										/>
									</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.active ? "active" : "inactive"}</TableCell>
									<TableCell>
										<Link to={`/admin/userEdit/${user.id}`}>
											<button className={styles.edit}>
												<EditIcon />
											</button>
										</Link>
									</TableCell>
									<TableCell>
										<button
											onClick={() => handleToggleStatus(user.id, user.active)}
											className={styles.delete}
                      >
											{user.active ? <BlockIcon /> : <RestoreIcon />}
										</button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</section>
	);
};

export default UserList;
