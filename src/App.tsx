import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Overview from "./page/ua";
import Product from "./page/product";
import Dashboard from "./page";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/ua/overview" replace />} />
          <Route path="ua/overview" element={<Overview />} />
          <Route path="/product/overview" element={<Product/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
