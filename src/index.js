import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Fake width Chat
function emitComent(id) {
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`lession-${id}`, {
        detail: `Nội dung comment của lession ${id}`,
      })
    );
  }, 2000);
}
emitComent(1);
emitComent(2);
emitComent(3);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
