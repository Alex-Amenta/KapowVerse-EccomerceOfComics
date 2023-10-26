import { useDispatch, useSelector } from "react-redux";
import styles from "./UserSearch.module.css";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { Toaster, toast } from "react-hot-toast";
import SearchClose from "@mui/icons-material/Close";
import { useState } from "react";
import { resetSearchUser, searchUsersByName } from "../../../redux/features/userSlice";

const UserSearch = () => {
  const [name, setName] = useState("");
  const usersCopy = useSelector((state) => state.user.allUsersCopy);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!name.length) {
      toast.error("Please enter the name of a user", {
        position: "top-center",
      });
      return;
    }

    const foundUser = usersCopy.find((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );

    if (foundUser) {
      dispatch(searchUsersByName(name));
    } else {
      toast.error(`"${name}" not found, please try again`, {
        position: "top-center",
        id: "toastId2",
      });
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleReset = () => {
    setName("");
    dispatch(resetSearchUser());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for name..."
      />

      {name.length > 0 && (
        <SearchClose className={styles.btn} onClick={handleReset} />
      )}
      <SavedSearchIcon className={styles.btn} onClick={handleSubmit} />
    </div>
  );
};

export default UserSearch;
