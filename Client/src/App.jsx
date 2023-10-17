import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/landing/LandingPage";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import MangasSection from "./views/mangas-section/Mangas";
import ComicsSection from "./views/comics-section/Comics";
import FormCreate from "./components/formCreate/FormCreate"
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Profile from "./components/profile/Profile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logUserByLocalStorage } from "./redux/features/userSlice";
import { fetchComics } from "./redux/features/comicSlice";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchComics());
    if (localStorage.getItem("token")) {
      dispatch(logUserByLocalStorage(JSON.parse(localStorage.getItem("token"))));
    }
  }, []);
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/comic/:id" element={<Detail />} />
        <Route path="/mangas" element={<MangasSection />} />
        <Route path="/comics" element={<ComicsSection />} />
        <Route path="/create" element={<FormCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
