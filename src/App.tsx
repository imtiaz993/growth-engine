import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./page/index";
import "./App.css";
import Overview from "./page/ua/Overview";
import Campaign from "./page/ua/Campaign";
import Creative from "./page/ua/Creative";
import Install from "./page/product/Install";
import Cohort from "./page/product/Cohort";
import Player from "./page/product/Player";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Navigate to="/ua/overview" replace />} />
          <Route path="ua/overview" element={<Overview />} />
          <Route path="ua/campaign" element={<Campaign />} />
          <Route path="ua/creative" element={<Creative />} />
          <Route path="product/install" element={<Install />} />
          <Route path="product/cohort" element={<Cohort />} />
          <Route path="product/player" element={<Player />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
