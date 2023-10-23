import { useState } from "react";
import styles from "./Logged.module.css";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { logoutUser } from "../../redux/features/userSlice";


const Logged = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
    window.alert("You have been logged out");
    window.location.href = "/home";
    handleMenuClose();
  };

  return (
    <div className={styles.loggedContainer}>
      <img className={styles.picture} src={user.image} alt={user.name} />
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{color: "white"}}
      >
        <ExpandMoreIcon />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 25,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => window.location.href = "/profile"}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default Logged;
