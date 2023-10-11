import styles from "./Cards.module.css";

const Cards = ({
  id,
  title,
  description,
  price,
  category,
  author,
  image,
  stock,
}) => {
  return (
    <main className={styles.container}>
      <div className={styles.cardImage}>
        <img src={image} alt={`imagen de ${title}`} />
      </div>
      <h3>{title}</h3>
      <p>{author}</p>
      <b>{price} $</b>
    </main>
  );
};

export default Cards;
