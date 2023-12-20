import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <App />
    <ToastContainer />
  </>
);
