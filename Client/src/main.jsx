import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../src/assets/murcielagos.png";
import'./utils/axios.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="18925108533-qjv5ur9kmppn9g350a2fbjmgt70p0ign.apps.googleusercontent.com">
          <App />
          <h3 className="test">
            This website requires a minimum of 350px of width.
          </h3>
          <Toaster
            toastOptions={{
              style: {
                border: "2px solid #000000",
                fontWeight: "bold",
                fontFamily: "Rubik, sans-serif",
                backgroundImage: `url(${imageAlert})`,
                backgroundSize: "cover",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",
              },
            }}
          />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
