import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PublicHome} from "./pages/PublicHome";
import {About} from "./pages/About";
import {Packages} from "./pages/Packages";
import {Exercises} from "./pages/Exercises";
import {Workouts} from "./pages/Workouts";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<PublicHome/>}/>
              <Route path={"/packages"} element={<Packages/>}/>
              <Route path={"/exercises"} element={<Exercises/>}/>
              <Route path={"/workouts"} element={<Workouts/>}/>
              <Route path={"/about"} element={<About/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
