import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./views/landing/LandingPage";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import MangasSection from "./views/mangas-section/Mangas";
import ComicsSection from "./views/comics-section/Comics";
import FormCreate from "./components/formCreate/FormCreate"

function App() {
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
      </Routes>
    </>
  );
}

export default App;
