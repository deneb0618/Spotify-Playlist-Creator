import React from "react";
import "./App.module.scss";
import Login from "./Login";
import Dashboard from "./Dashboard";

const getToken = (url: any) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev: any, curr: any) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

const token = getToken(window.location.hash);
localStorage.setItem("params", JSON.stringify(token));
function App() {
  return typeof token.access_token === "string" ? <Dashboard /> : <Login />;
}

export default App;
