import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { fetchComics } from "../../redux/features/comicSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";

function Home() {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);

  useEffect(() => {
    dispatch(fetchComics());
  }, []);

  return (
    <>
      <Navbar />
      <CardsContainer allComics={allComics} />
    </>
  );
}

export default Home;
