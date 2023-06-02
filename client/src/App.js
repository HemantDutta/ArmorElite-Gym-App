import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PublicHome} from "./pages/PublicHome";
import {About} from "./pages/About";
import {Packages} from "./pages/Packages";
import {Exercises} from "./pages/Exercises";
import {Workouts} from "./pages/Workouts";
import {UserDashboard} from "./pages/UserDashboard";
import {WorkoutLanding} from "./pages/WorkoutLanding";
import {PaymentSuccess} from "./pages/PaymentSuccess";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<PublicHome/>}/>
                    <Route path={"/packages"} element={<Packages/>}/>
                    <Route path={"/exercises"} element={<Exercises/>}/>
                    <Route path={"/workouts"} element={<Workouts/>}/>
                    <Route path={"/workout-landing"} element={<WorkoutLanding/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/user-dashboard"} element={<UserDashboard/>}/>
                    <Route path={"/payment-success"} element={<PaymentSuccess/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
