import {Link} from "react-router-dom";

export const Navbar = () => {

    //open Fitness Menu
    function openFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");

        if (!fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.add("fitnessMenu-open");
        }
    }

    //Mouse Leave Fitness Menu Close
    function closeFitnessMenu() {
        let fitnessMenu = document.getElementById("fitnessMenu");

        if (fitnessMenu.classList.contains("fitnessMenu-open")) {
            fitnessMenu.classList.remove("fitnessMenu-open");
        }
    }

    return (
        <>
            <nav>
                <div className="navbar-container">
                    <div className="navbar-logo-container">
                        <img src="assets/images/armorEliteLogoSlimTrans.png" alt="ArmorElite Logo"/>
                    </div>
                    <div className="navbar-optionList-container">
                        <ul>
                            <li onMouseOver={openFitnessMenu}><Link to={"/fitness"}>Fitness</Link></li>
                            <li><Link to={"/packages"}>Packages</Link></li>
                            <li><Link to={"/about"}>About</Link></li>
                        </ul>
                    </div>
                    <div className="navbar-profileMenu-container">
                        <div className="navbar-login_signup-button">
                            <button className="btn btn-outline-light fw-bold">Login/Signup</button>
                        </div>
                        <div className="navbar-toggler-button">
                            <button><i className="fa-solid fa-bars"></i></button>
                        </div>
                    </div>
                </div>
                <div className="navbar-fitnessMenu-container shadow" id="fitnessMenu" onMouseLeave={closeFitnessMenu}>

                </div>
            </nav>
        </>
    )
}