import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"


export const Navbar = () => {

    //Navigator
    const nav = useNavigate();

    //open Fitness Menu
    function openFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");
        let body = document.getElementsByTagName("body")[0];
        if (!fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.add("fitnessMenu-open");
            body.style.overflowY = "hidden";
        }
    }

    //Mouse Leave Fitness Menu Close
    function closeFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");
        let body = document.getElementsByTagName("body")[0];
        if (fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.remove("fitnessMenu-open");
            body.style.overflowY = "auto";
        }
    }

    //Navigate to Exercise
    function navToEx() {
        nav("/exercises");
    }

    //Navigate to Workouts
    function navToWo() {
        nav("/workouts");
    }

    //Open Big Menu
    function openBigMenu() {
        let bigMenu = document.getElementById("bigMenu");
        let body = document.getElementsByTagName("body")[0];
        if (bigMenu.classList.contains("bigMenu-open")) {
            bigMenu.classList.remove("bigMenu-open");
            setTimeout(() => {
                bigMenu.classList.add("d-none");
                body.style.overflowY = "auto";
            }, 200)
        } else {
            bigMenu.classList.remove("d-none");
            setTimeout(() => {
                bigMenu.classList.add("bigMenu-open");
                body.style.overflowY = "hidden";
            }, 10)
        }
    }

    return (
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-logo-container">
                        <Link to={"/"}><img src="assets/images/armorEliteLogoSlimTrans.png" alt="ArmorElite Logo"/></Link>
                    </div>
                    <div className="navbar-optionList-container">
                        <ul>
                            <li onMouseOver={openFitnessMenu}>Fitness</li>
                            <li><Link to={"/packages"}>Packages</Link></li>
                            <li><Link to={"/about"}>About</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-profileMenu-container">
                        <div className="navbar-login_signup-button">
                                <button className="btn btn-outline-light">Login/Signup</button>
                        </div>
                        <div className="navbar-toggler-button">
                            <button onClick={openBigMenu}><i className="fa-solid fa-bars"/></button>
                        </div>
                    </div>
                </div>
                <div className="navbar-fitnessMenu-container shadow" id="fitnessMenu" onMouseLeave={closeFitnessMenu}>
                    <div className="fitnessMenu-topText-container">
                        <span className="text-light">Begin your fitness journey</span>
                    </div>
                    <div className="fitnessMenu-optionCards-container">
                        <div className="fitnessMenu-optionCard" onClick={navToEx}>
                            <div className="fitnessMenu-optionCard-topText">
                                <span>Find Exercises</span>
                            </div>
                            <div className="fitnessMenu-optionCard-icon">
                                <img src="assets/images/exercises.png" alt="Exercise Icon"/>
                            </div>
                        </div>
                        <div className="fitnessMenu-optionCard" onClick={navToWo}>
                            <div className="fitnessMenu-optionCard-topText">
                                <span>Create A Workout</span>
                            </div>
                            <div className="fitnessMenu-optionCard-icon">
                                <img src="assets/images/workouts.png" alt="Workouts Icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-bigMenu-container d-none" id="bigMenu">
                    <div className="bigMenu-innerContainer">
                        <div className="bigMenu-optionList-container">
                            <ul className="m-0 p-0">
                                <li><i className="fa-solid fa-circle"/><Link to={"/packages"}>Packages</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/exercises"}>Exercises</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/workouts"}>Workouts</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={""}>Join Now</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/about"}>About</Link></li>
                            </ul>
                        </div>
                        <div className="bigMenu-logo-container">
                            <img src="assets/images/fav.png" alt="ArmorElite Logo"/>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}