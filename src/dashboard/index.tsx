import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import Filters from "./Filters";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full m-5">
          <Filters />
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
