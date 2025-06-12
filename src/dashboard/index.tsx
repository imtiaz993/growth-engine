import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div className="bg-gray-100 h-svh overflow-hidden flex flex-col">
      <Appbar />
      <div className="flex m-3 overflow-hidden">
        <div className="w-64">
          <Sidebar />
        </div>
        <div className="p-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
