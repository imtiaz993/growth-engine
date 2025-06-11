import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/index";
import "./App.css";
import Overview from "./dashboard/ua/Overview";
import Campaign from "./dashboard/ua/Campaign";
import Creative from "./dashboard/ua/Creative";
import Install from "./dashboard/product/Install";
import Cohort from "./dashboard/product/Cohort";
import Player from "./dashboard/product/Player";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="ua" element={<Overview />} />
          <Route path="ua/campaign" element={<Campaign />} />
          <Route path="ua/creative" element={<Creative />} />
          <Route path="product/install" element={<Install />} />
          <Route path="product/cohort" element={<Cohort />} />
          <Route path="product/player" element={<Player />} />
        </Route>
        <Route index element={<Overview />} />
      </Routes>
    </div>
  );
}

export default App;
