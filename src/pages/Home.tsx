import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Diurno from "../components/Diurno";
import Vespertino from "../components/Vespertino";
import Perfil from "../components/Perfil";
import DiaSolicitado from "../components/DiaSolicitado";
import Ausencias from "../components/Ausencias";
import { Form, Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar texto="Hola,Prof.Borja2"></Navbar>
      <div className="flex flex-row w-full h-full">
        <div className="h-screen w-[20%] border-solid border-r border-gray-200 justify-end">
          <Sidebar></Sidebar>
        </div>
        <div className="w-[80%]">
          <Routes>
            <Route path="/form" element={<Form></Form>}></Route>
            <Route path="/" element={<Diurno></Diurno>}></Route>
            <Route
              path="/vespertino"
              element={<Vespertino></Vespertino>}
            ></Route>
            <Route path="/perfil" element={<Perfil></Perfil>}></Route>{" "}
            <Route
              path="/dias-solicitados"
              element={<DiaSolicitado></DiaSolicitado>}
            ></Route>
            <Route path="/ausencias" element={<Ausencias></Ausencias>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
