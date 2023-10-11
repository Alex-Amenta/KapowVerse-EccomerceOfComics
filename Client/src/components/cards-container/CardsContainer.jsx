import Cards from "../cards/Cards";
import styles from "./CardsContainer.module.css";

const CardsContainer = ({ allComics }) => {
  return (
    <section className={styles.container}>
      {allComics?.map(
        ({ id, title, description, price, category, author, image, stock }) => {
          return (
            <Cards
              key={id}
              title={title}
              description={description}
              price={price}
              category={category}
              author={author}
              image={image}
              stock={stock}
            />
          );
        }
      )}
    </section>
  );
};

export default CardsContainer;
