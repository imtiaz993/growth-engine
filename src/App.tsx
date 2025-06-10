import "./App.css";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div>
      <Appbar />
      <div className="flex">
        <Sidebar />
        <p>Hello</p>
      </div>
    </div>
  );
}

export default App;
