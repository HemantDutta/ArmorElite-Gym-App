import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PublicHome} from "./pages/PublicHome";
import {Fitness} from "./pages/Fitness";
import {About} from "./pages/About";
import {Packages} from "./pages/Packages";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<PublicHome/>}/>
              <Route path={"/fitness"} element={<Fitness/>}/>
              <Route path={"/packages"} element={<Packages/>}/>
              <Route path={"/about"} element={<About/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
