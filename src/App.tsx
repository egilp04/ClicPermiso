import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diurno from "./components/Diurno";
import Ausencias from "./components/Ausencias";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Diurno></Diurno>}></Route>
          <Route path="vespertino"></Route>
          <Route path="perfil"></Route>
          <Route path="dias-solicitados"></Route>
          <Route path="ausencias" element={<Ausencias></Ausencias>}></Route>
        </Route>
      </Routes>{" "}
    </>
  );
}

export default App;
