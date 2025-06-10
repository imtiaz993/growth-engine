import "./App.css";
import Appbar from "./Appbar";
import Filters from "./Filters";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full m-5">
          <Filters />
          <p className="p-5">Hello</p>
        </div>
      </div>
    </div>
  );
}

export default App;
