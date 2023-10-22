import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addToCart,
  getCartByUserId,
  reduceQuantity,
  removeItemFromCart,
  addItemToCart,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from "../../redux/features/cartSlice";
import { useEffect } from "react";
import axios from "axios";
import base_url from "../../utils/development";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  // const userId = user ? user.id : null;

  // const reduceQuantityOfItem = () => {
  //   dispatch(reduceQuantity(cartItemId));
  // };

  // const incrementQuantityOfItem = (comicId) => {
  //   dispatch(addToCart({ userId: userId, comicId: comicId }));
  // };

  // const removeItem = () => {
  //   dispatch(removeItemFromCart(cartItemId));
  // };

  const reduceQuantityOfItem = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const incrementQuantityOfItem = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const removeItemFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handlePayFromMP = () => {
    if (user && cart) {
      try {
        axios
          .post('http://localhost:3001/payment/create-order', { user, cart })
          .then((res) => (window.location.href = res.data.init_point));
      } catch (error) {
        console.log('Error al realizar la solicitud:', error);
      }
    }
  };

  return (
    <section className={styles.container}>
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
              <span>{item.quantity}</span>
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
              Total: <span>{cart.totalPrice.toFixed(2)} $</span>
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
