import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./views/landing/LandingPage";
import Home from "./views/home/Home";
import Detail from "./views/detail/Detail";
import Navbar from "./components/navbar/Navbar";
import MangasSection from "./views/mangas-section/Mangas";
import ComicsSection from "./views/comics-section/Comics";
import FormCreate from "./components/formCreate/FormCreate"

const router = createHashRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/app",
		element: <Navbar />,
		children: [
			{
				path: "/app/home",
				element: <Home />,
			},
			{
				path: "/app//mangas",
				element: <MangasSection />,
			},
			{
				path: "/app//comics",
				element: <ComicsSection />,
			},
			{
				path: "/app//comic/:id",
				element: <Detail />,
			},
			{
				path: "/app//create",
				element: <FormCreate />,
			},
			{
				path: "/app/*",
				element: <div>404</div>,
			},
		],
		
	},
	{
		path: "/*",
		element: <div>404</div>,
	},

]);


ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router}></RouterProvider>
	</Provider>
);
