import { createRoot } from "react-dom/client";
import App from "./App";
import Modal from "react-modal";

Modal.setAppElement("#root");
// eslint-disable-next-line no-restricted-globals
addEventListener("error", (event) => {
  localStorage.clear();
  window.location.reload();
});
const root = createRoot(document.querySelector("#root"));

root.render(<App />);
