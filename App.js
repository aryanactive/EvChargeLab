
import React from "react";
import ReactDOM from "react-dom/client";
import EVChargeLabDashboard from "./EVChargeLabDashboard";
import "./index.css";

function App() {
  return <EVChargeLabDashboard />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
