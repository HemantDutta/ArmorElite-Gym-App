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

    //Join Now Functions
    function openSignIn() {
        let signIn = document.getElementById("signIn");
        let signUp = document.getElementById("signUp");
        let signInCont = document.getElementById("signInCont");
        let signUpCont = document.getElementById("signUpCont");

        if (!signIn.classList.contains("button-active")) {
            signIn.classList.add("button-active");
            signUp.classList.remove("button-active");
            signUpCont.classList.remove("joinNowActive");
            setTimeout(() => {
                signUpCont.classList.add("d-none");
                signInCont.classList.remove("d-none");
                setTimeout(() => {
                    signInCont.classList.add("joinNowActive");
                }, 100)
            }, 400)
        }
    }

    function openSignUp() {
        let signIn = document.getElementById("signIn");
        let signUp = document.getElementById("signUp");
        let signInCont = document.getElementById("signInCont");
        let signUpCont = document.getElementById("signUpCont");

        if (!signUp.classList.contains("button-active")) {
            signUp.classList.add("button-active");
            signIn.classList.remove("button-active");
            signInCont.classList.remove("joinNowActive");
            setTimeout(() => {
                signInCont.classList.add("d-none");
                signUpCont.classList.remove("d-none");
                setTimeout(() => {
                    signUpCont.classList.add("joinNowActive");
                }, 100)
            }, 400)
        }
    }

    //Open Join Now
    function openJoinNow() {
        let bigMenu = document.getElementById("bigMenu");
        let body = document.getElementsByTagName("body")[0];
        let overlay = document.getElementById("joinNowOverlay");
        let joinNow = document.getElementById("joinNowCont");

        if (!overlay.classList.contains("overlayActive")) {
            if (bigMenu.classList.contains("bigMenu-open")) {
                bigMenu.classList.remove("bigMenu-open");
                setTimeout(() => {
                    bigMenu.classList.add("d-none");
                    overlay.classList.remove("d-none");
                    joinNow.classList.remove("d-none");
                    setTimeout(() => {
                        overlay.classList.add("overlayActive");
                        joinNow.classList.add("joinContActive");
                    }, 100);
                }, 200);
            } else {
                overlay.classList.remove("d-none");
                joinNow.classList.remove("d-none");
                body.style.overflowY = "hidden";
                setTimeout(() => {
                    overlay.classList.add("overlayActive");
                    joinNow.classList.add("joinContActive");
                }, 100);
            }
        }
    }

    //Close join Now
    function closeJoinNow()
    {
        let body = document.getElementsByTagName("body")[0];
        let overlay = document.getElementById("joinNowOverlay");
        let joinNow = document.getElementById("joinNowCont");

        if(overlay.classList.contains("overlayActive"))
        {
            joinNow.classList.remove("joinContActive");
            overlay.classList.remove("overlayActive");
            body.style.overflowY = "auto";
            setTimeout(()=>{
                overlay.classList.add("d-none");
                joinNow.classList.add("d-none");
            }, 100)
        }
    }

    return (
        <>
            {/*Navbar*/}
            <nav>
                <div className="navbar-container navActive">
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
                            <button className="btn btn-outline-light" onClick={openJoinNow}>Login/Signup</button>
                        </div>
                        <div className="navbar-toggler-button">
                            <button onClick={openBigMenu}><i className="fa-solid fa-bars"/></button>
                        </div>
                    </div>
                </div>
                <div className="navbar-fitnessMenu-container shadow" id="fitnessMenu" onMouseLeave={closeFitnessMenu}>
                    <div className="fitnessMenu-topText-container text-center">
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
                                <li onClick={openJoinNow}><i className="fa-solid fa-circle"/><Link to={""}>Join Now</Link></li>
                                <li><i className="fa-solid fa-circle"/><Link to={"/about"}>About</Link></li>
                            </ul>
                        </div>
                        <div className="bigMenu-logo-container">
                            <img src="assets/images/fav.png" alt="ArmorElite Logo"/>
                        </div>
                    </div>
                </div>
            </nav>
            {/*Navbar End*/}
            {/*Join Now*/}
            <div className="joinNow-overlay d-none" id="joinNowOverlay" onClick={closeJoinNow}/>
            <div className="joinNow-container d-none" id="joinNowCont">
                <div className="joinNow-logo">
                    <img src="/assets/images/armorEliteLogoSlimTrans.png" alt="Armor Elite Logo"/>
                </div>
                <div className="joinNow-tabGroup-container">
                    <button className="button-active" id="signUp" onClick={openSignUp}>Sign Up</button>
                    <button onClick={openSignIn} id="signIn">Sign In</button>
                </div>
                <div className="joinNow-signUp-container joinNowActive" id="signUpCont">
                    <div className="signUp-header">
                        <span>Start Your Journey</span>
                    </div>
                    <div className="signUp-form-container">
                        <form>
                            <div className="row">
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="name">Full Name</label>
                                    <input id="name" name="name" className="mt-2" type="text" placeholder="Enter your full name here..."/>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" className="mt-2" type="email" placeholder="Enter your email here..."/>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" name="password" className="mt-2" type="password" placeholder="Enter your password here..."/>
                                </div>
                                <div className="signUp-inputGroup col-lg-12 d-flex flex-column mt-5">
                                    <button className="btn btn-outline-light">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="joinNow-signIn-container d-none" id="signInCont">
                    <div className="signIn-header">
                        <span>Welcome Back!</span>
                    </div>
                    <div className="signIn-form-container">
                        <form>
                            <div className="row">
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email" className="mt-2" type="email" placeholder="Enter your email here..."/>
                                </div>
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-4">
                                    <label htmlFor="password">Password</label>
                                    <input id="password" name="password" className="mt-2" type="password" placeholder="Enter your password here..."/>
                                </div>
                                <div className="signIn-inputGroup col-lg-12 d-flex flex-column mt-5">
                                    <button className="btn btn-outline-light">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*Join Now End*/}
        </>
    )
}