import Cards from "../cards/Cards";
import styles from "./CardsContainer.module.css";
import { useSelector } from "react-redux"; 
const CardsContainer = ({ allComics }) => {
	const isLoading = useSelector((state) => state.comic.loading); 
	const isError = useSelector((state) => state.comic.error); 
	return (
		<section className={styles.container}>
			{allComics.length ? (
				allComics?.map(
					({
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
							<Cards
								key={id}
								id={id}
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
				)
			) : (
				<>

					{isLoading && !isError ? (
						<h1>Loading...</h1>
					) : (
					isError ? (
						<h1>There was an error</h1>
					) : (
						<h1>There are no items to show</h1>
						)
					)}
				</>
			)}
		</section>
	);
};

export default CardsContainer;
