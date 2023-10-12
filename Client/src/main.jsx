import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./views/landing/LandingPage";
import Home from "./views/home/Home";

const router = createHashRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	// {
	// 	path: "/detail/:param",
	// 	element: <Detail />,
	// },
	// {
	// 	path: "/add",
	// 	element: <AddForm />,
	// }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router}></RouterProvider>
	</Provider>
);
