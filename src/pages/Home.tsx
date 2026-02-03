import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Navbar texto="Hola,Prof.Borja2"></Navbar>
      <div className="flex flex-row w-full h-full">
        <div className="h-screen w-[20%] border-solid border-r border-gray-200 justify-end">
          <Sidebar></Sidebar>
        </div>
        <div className="w-[80%]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Home;
