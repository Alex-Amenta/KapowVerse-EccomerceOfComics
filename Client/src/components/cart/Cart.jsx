import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setItemQuantity,
  clearCart,
} from "../../redux/features/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../utils/development";
import { Toaster, toast } from "react-hot-toast";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  const reduceQuantityOfItem = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const incrementQuantityOfItem = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const removeItemFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleQty = (e, itemId) => {
    dispatch(setItemQuantity({ itemId: itemId, quantity: e.target.value }));
  };

  const handlePayFromMP = () => {
    if (!user) {
      toast.error("You must be logged in to make a purchase", {
        position: "bottom-right",
        id: "error",
      });
    } else {
      try {
        axios
          .post(`${base_url}/payment/create-order`, { user, cart })
          .then((res) => (
            window.location.href = res.data.init_point
            ));
      } catch (error) {
        console.log("Error al realizar la solicitud:", error);
      }
    }
  };

  const handleFocus = (event) => event.target.select();

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <section className={darkMode ? styles.container : styles.dark}>
      {cart &&
        cartItems?.map((item) => (
          <div key={item.id} className={styles.cartContainer}>
            <div className={styles.contentComic}>
              <img src={item.image} alt={item.title} />
              <div className={styles.priceAndStock}>
                <p>
                  Price: <span>{item.price} $</span>
                </p>
                <p>
                  Stock: <span>{item.stock}</span>
                </p>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={() => reduceQuantityOfItem(item.id)}>-</button>
              <input
                onChange={(e) => handleQty(e, item.id)}
                value={item.quantity}
                onFocus={handleFocus}
                className={styles.inputComic}
              ></input>
              <button onClick={() => incrementQuantityOfItem(item.id)}>
                +
              </button>
              <div className={styles.deleteForever}>
                <button onClick={() => removeItemFromCart(item.id)}>
                  <DeleteForeverIcon />
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      {cartItems.length === 0 ? (
        <p className={styles.emptyCartMessage}>
          Your cart is empty, add products to your cart!
        </p>
      ) : (
        <div className={styles.totalAndPay}>
          <div className={styles.totalContainer}>
            <p>
              Total: <span>{cart.totalPrice} $</span>
            </p>
          </div>
          <div className={styles.payButtonContainer}>
            <button className={styles.payButton} onClick={handlePayFromMP}>
              Pay
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
