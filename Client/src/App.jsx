import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./views/landing/LandingPage";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import MangasSection from "./views/mangas-section/Mangas";
import ComicsSection from "./views/comics-section/Comics";
import CreateComic from "./components/admin/createComic/CreateComic";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Profile from "./components/profile/Profile";
import EditUser from "./components/editUser/EditUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/features/userSlice";
import { fetchComics } from "./redux/features/comicSlice";
import AdminGuard from "./components/guards/AdminGuard";
import LogAdmin from "./components/admin/logAdmin/LogAdmin";
import Sales from "./components/admin/sales/Sales";
import UserList from "./components/admin/usersList/UserList";
import AdminHome from "./components/admin/home/AdminHome";
import EditComic from "./components/admin/editComic/Editcomic";
import ComicsAdmin from "./components/admin/comicsAdmin/ComicsAdmin";

function App() {
  console.log("hola")
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  useEffect(() => {
    dispatch(fetchComics());
    if (localStorage.getItem("userlog")) {
      dispatch(
        loginUser(JSON.parse(localStorage.getItem("userlog")))
      );
    }
  }, []);

  useEffect(() => {}, [allComics]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/comic/:id" element={<Detail />} />
        <Route path="/mangas" element={<MangasSection />} />
        <Route path="/comics" element={<ComicsSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

        {/* Rutas protegidas para admin */}
        {/* <Route element={<AdminGuard onLogin={loginHandler}/>}> */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/create" element={<CreateComic />} />
          <Route path="/admin/edit/:id" element={<EditComic />} />
          <Route path="/admin/comics" element={<ComicsAdmin />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/sales" element={<Sales />} />
        {/* </Route> */}
        <Route path="/admin/login" element={<LogAdmin />} />
      </Routes>
    </>
  );
}

export default App;
