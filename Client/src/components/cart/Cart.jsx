import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addToCart,
  reduceQuantity,
  removeItemFromCart,
} from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);

  const userId = user ? user.id : null;
  const cartItemId = cartItem.id;

  const reduceQuantityOfItem = () => {
    dispatch(reduceQuantity(cartItemId));
  };

  const incrementQuantityOfItem = (comicId) => {
    dispatch(addToCart({ userId: userId, comicId: comicId }));
  };

  const removeItem = () => {
    dispatch(removeItemFromCart(cartItemId));
  };

  return (
    <section className={styles.container}>
      {cartItem?.map((item) => (
        <div key={item.id} className={styles.cartContainer}>
          <div className={styles.contentComic}>
            <img src={item?.cartItems.image} alt={item?.cartItems.title} />
            <p>Price: {item?.cartItems.price}</p>
            <p>Stock: {item?.cartItems.stock}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={reduceQuantityOfItem}>-</button>
            <span>{item?.cartItems.quantity}</span>
            <button
              onClick={() => incrementQuantityOfItem(item?.cartItems.comicId)}
            >
              +
            </button>
            <div className={styles.deleteForever}>
              <button onClick={removeItem}>
                <DeleteForeverIcon />
              </button>
            </div>
          </div>
        </div>
      ))}
      {cartItem.length === 0 ? (
        <p className={styles.emptyCartMessage}>
          Your cart is empty, add products to your cart!
        </p>
      ) : (
        <div className={styles.payButtonContainer}>
          <button className={styles.payButton}>Pay</button>
        </div>
      )}
      <div className={styles.totalContainer}>
        <p>Total: <span>{cartItem.length === 0 ? 0 : cartItem.total} $</span></p>
      </div>
    </section>
  );
};

export default Cart;
