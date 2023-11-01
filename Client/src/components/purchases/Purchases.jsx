import { useEffect, useState } from "react";
import base_url from "../../utils/development";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import styles from "./Purchases.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import ReviewsIcon from "@mui/icons-material/Reviews";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Purchases = () => {
	const user = useSelector((state) => state.user.user);
	const navigate = useNavigate();
	const [purchases, setPurchases] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user) {
			setIsLoading(true);
			axios
				.get(`${base_url}/purchase/${user?.id}`)
				.then((res) => {
					setPurchases(res.data);
				})
				.catch((error) => console.error(error))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [user]);

  

const darkMode = useSelector(selectDarkMode);

// Group purchases by mpId
const groupedPurchases = purchases.reduce((acc, purchase) => {
  const mpId = purchase.mpId;
  if (!acc[mpId]) {
    acc[mpId] = [];
  }
  acc[mpId].push(purchase);
  return acc;
}, {});

useEffect(() => {
  document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
}, [darkMode]);

return (
  <>
    <Navbar />
    <section className={darkMode ? styles.container : styles.dark}>
      <h1>Purchases</h1> <hr />
      {Object.keys(groupedPurchases).length === 0 && (
        <div className={styles.notPurchases}>
          <p>No purchases yet.</p>
          <NavLink
            to="/home"
            className={styles.link}>
            <AddCircleIcon
              style={{ fontSize: "3rem" }}
              titleAccess="Add purchases"
            />
          </NavLink>
        </div>
      )}
      {Object.keys(groupedPurchases).map((mpId) => (
        <div key={mpId} className={styles.purchaseContainer}>
           <h2>Order N°: {mpId} - Date: <span>{groupedPurchases[mpId][0].purchaseDate.slice(0, 10)}</span></h2>
          {groupedPurchases[mpId].map((purchase) => (
            <Accordion
              key={purchase.id}
              className={styles.Accordion}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    style={darkMode ? { color: "gray" } : { color: "white" }}
                  />
                }>
                <Typography>{purchase.comic.title}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.AccordionDetails}>
                <div className={styles.infoComic}>
                  <img
                    src={purchase.comic.image}
                    alt={purchase.comic.title}
                  />
                  <p>{purchase.comic.title}</p>
                </div>
                <div
                  key={purchase.id}
                  className={styles.infoPurchase}>
                  <h3>Info of purchase</h3> <hr />
                  <p>
                    Quantity: <span>{purchase.quantity}</span>
                  </p>
                  <p>
                    Total: <span>{purchase.total} $</span>
                  </p>
                  <p>
                  <NavLink
										to={`/comic/${purchase.comic.id}`}
										className={styles.link}>
										<ReviewsIcon /> Leave a review about the product
									</NavLink>
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      ))}
    </section>
  </>
);
}
// 									<hr />

// 								</div>
// 							</AccordionDetails>
// 						</Accordion>
// 					))}
// 				</div>
// 			</section>
// 		</>
// 	);
// };

export default Purchases;
